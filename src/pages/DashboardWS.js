import React, { useEffect, useState } from 'react';
import { Col, Row } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const DashboardWS = () => {

    // const [campaigns, setCampaigns] = useState([]);
    const [users, setUsers] = useState({
        data:[],
    });
    const [numberOfusers, setNumberOfUsers] = useState(0);


    const getData = () => {
        if (users && users.length > 0) {
            console.log('users', users);
        }
        return [];
    }

    const data = {
        labels: ['PREPARATION', 'PROPOSAL', 'DESIGN', 'VALIDATED'],
        datasets: [
            {
                label: '# of Votes',
                data: getData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    const options = {
        method: 'GET',
    };

    useEffect(() => {
        getCampaignsWithStatus();
    }, []);


    async function getCampaignsWithStatus() {
        var ws;
        if (window.WebSocket) {
            ws = new WebSocket("ws://localhost:8090/users");
            ws.onopen = function () {
                console.log("open");
            }
            ws.onmessage = function (e) {
                let user = JSON.parse(e.data);
                console.log("data recived ",e.data)
            }
            ws.onerror = function (e) {
                console.log("erro  ", e);
            }
            ws.onclose = function (e) {
                console.log("close");
            }
        } else {
            console.log("no supported");
        }
    }

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
                        {
                            users && users.length ? (
                                <>
                                    <h1>Number of users : {users.length}</h1>
                                    <Pie data={data} />
                                </>
                            ) : (
                                <h1>Featching new users ...</h1>
                            )
                        }

                    </Row>
                </Row>
            </div>
        </>
    )
}

export default DashboardWS;