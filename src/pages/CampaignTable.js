import {useEffect, useState} from "react";
import React from "react";
import useSSE from "../hooks/useSSE";
import {Table} from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'NAME',
        key: 'NAME',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Type',
        dataIndex: 'TYPE',
        key: 'TYPE',
    },
    {
        title: 'Id',
        dataIndex: 'ID',
        key: 'ID',
    },
]
const CampaignTable = () => {

    const {data, loading} = useSSE('http://localhost:8090/api/campaigns', 'campaigns-event', () => {
        console.log('open')
    });
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (data) {
            setRows((rows) => [...rows, data]);
        }
    }, [data])
    return (
        loading ? (<p>Loading ...</p>) : (
            <Table columns={columns} dataSource={rows}></Table>
        )
    )
}
export default CampaignTable;