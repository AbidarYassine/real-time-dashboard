import React, { useEffect, useState } from 'react';
import { Col, Row } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const DashboardMaterialize = () => {

    // const [campaigns, setCampaigns] = useState([]);
    const [campaignsWithStatus, setCampaignsWithStatus] = useState([]);


    const getData = () => {
        if (campaignsWithStatus && campaignsWithStatus.length > 0) {
            console.log('campaignsWithStatus', campaignsWithStatus);
            return [campaignsWithStatus[0].count, campaignsWithStatus[1].count, campaignsWithStatus[2].count, campaignsWithStatus[3].count];
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
        setInterval(() => {
            getCampaignsWithStatus();
        }, 1000);
    }, []);


    async function getCampaignsWithStatus() {
        const response = await fetch('http://localhost:8080/campaigns/count', options);
        console.log("response", response);
        const campaignsWithStatus = await response.json();
        setCampaignsWithStatus(campaignsWithStatus);
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
                            campaignsWithStatus && campaignsWithStatus.length ? (
                                <>
                                    <h1>Number of campaigns : {Number(campaignsWithStatus[0].count) + Number(campaignsWithStatus[1].count) + Number(campaignsWithStatus[2].count) + Number(campaignsWithStatus[3].count)}</h1>
                                    <Pie data={data} />
                                </>
                            ) : (
                                <h1>Featching new campaigns ...</h1>
                            )
                        }

                    </Row>
                </Row>
            </div>
        </>
    )
}

export default DashboardMaterialize;