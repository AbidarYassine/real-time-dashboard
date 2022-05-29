import React, { useEffect, useState } from 'react';
import { Row } from "antd";
import { PieChart, Pie, Tooltip } from 'recharts';
import useSSE from "../hooks/useSSE";
import CampaignTable from "./CampaignTable";


const DashboardSSE = () => {

    const [data, setData] = useState([]);
    const {data: record,loading} = useSSE('http://localhost:8090/api/campaigns/status','campaigns-status-event',()=>{
        console.log('open')
    });

    useEffect(()=>{
        if (record) {
            const obj={
                name:record.type,
                value:record.total_campaign,
            };
            console.log('new event ',obj);
            let index = data.findIndex(a => a.name === obj.name);
            const newArray = [...data];
            if (index > -1) {
                newArray[index] = obj;
                setData(newArray);
            } else {
                setData((data) => [...data, obj]);
            }
        }
    },[record])
    return (
        <>
            <div
                style={{
                    padding: "0 12px 12px 12px",
                    margin: "10px 8px"
                }}
            >
                {
                    loading ? (<p>loading ...</p>) :(
                        <>
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
                                            dataKey="value"
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
                        </>
                    )
                }

            </div>
            <CampaignTable/>
        </>
    )
}

export default DashboardSSE;