import React, { useEffect, useState } from 'react';
import { Row } from "antd";
import { PieChart, Pie, Tooltip } from 'recharts';
import { fetchEventSource } from "@microsoft/fetch-event-source";


const DashboardSSE = () => {

    // const [campaigns, setCampaigns] = useState([]);
    const [data, setData] = useState([]);

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];
    /*useEffect(() => {
        const source = new EventSource(`http://localhost:8090/api/campaigns/status`);

        source.addEventListener('open', () => {
            console.log('SSE opened!');
        });
        source.addEventListener('campaigns-status-event', (e) => {
            const parsedData = JSON.parse(e.data);
            console.log('new event', parsedData);
            const newArray = [...data];
            console.log('all events' ,newArray);
            console.log('parsedData' ,parsedData);
            let index = data.findIndex(a => a.type == parsedData.type);
            console.log('index ',index);
            if (index > -1) {
                newArray[index] = parsedData;
                setData(newArray);
            }else{
                setData((data) => [...data, parsedData]);
            }
            console.log('data ',data);
        });
        source.addEventListener('error', (e) => {
            console.error('Error: ', e);
        });
        return () => {
            source.close();
        };
    }, []);*/
    useEffect(() => {
        const fetchData = async () => {
          await fetchEventSource('http://localhost:8090/api/campaigns/status', {
            method: "GET",
            headers: {
              Accept: "text/event-stream",
            },
            onopen(res) {
              if (res.ok && res.status === 200) {
                console.log("Connection made ", res);
              } else if (
                res.status >= 400 &&
                res.status < 500 &&
                res.status !== 429
              ) {
                console.log("Client side error ", res);
              }
            },
            onmessage(event) {
              console.log(event.data);
              const parsedData = JSON.parse(event.data);
              setData((data) => [...data, parsedData]);
              console.log('data',[...data]);
            },
            onclose() {
              console.log("Connection closed by the server");
            },
            onerror(err) {
              console.log("There was an error from server", err);
            },
          });
        };
        fetchData();
      }, []);
    return (
        <>
            <div
                style={{
                    padding: "0 12px 12px 12px",
                    margin: "10px 8px"
                }}
            >
                <Row
                    style={{
                        padding: "0 20px"
                    }}
                ></Row>
                <Row>
                    <Row
                        type="flex"
                        justify="space-around"
                        align="top"
                        gutter={24}
                        style={{
                            margin: "25px 0"
                        }}
                    >
                        <h1>Number of campaigns by status</h1>
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="total_campaign"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </Row>
                </Row>
            </div>
        </>
    )
}

export default DashboardSSE;