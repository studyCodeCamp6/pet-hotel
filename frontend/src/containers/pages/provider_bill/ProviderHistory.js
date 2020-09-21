import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import axios from '../../../config/axios';
import moment from "moment";

function ProviderHistory() {
    let [bill, setBill] = useState([]);
    let [allData, setAllData] = useState([]);

    const columns = [
        {
            title: "Customer Name",
            dataIndex: "customer_name",
            key: "customer_name",
        },
        {
            title: 'Pet Name',
            dataIndex: 'pet_name',
            key: 'pet_name'
        },
        {
            title: 'Pet Type',
            dataIndex: 'pet_type',
            key: 'pet_type'
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service'
        },

        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",

            render: (startDate) => (
                <>
                    <span>{moment(startDate).format("Do MMMM  h:mm a")}</span>
                </>
            )
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            render: (endDate) => (
                <>
                    <span>{moment(endDate).format("Do MMMM  h:mm a")}</span>
                </>
            )
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price'
        },
    ]


    const fetchData = async () => {
        try {
            const targetBill = await axios.get(`/histories/providers`);
            console.log(targetBill.data.result)
            setBill(targetBill.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const source = bill.map((item, index) => ({
        key: index,
        startDate: item.startDate,
        endDate: item.endDate,
        customer_name: item.customerName,
        pet_name: item.pets_data,
        pet_type: item.pets_Breed , 
        total_price : item.cost,
        service : item.service

    }))
    console.log(bill)

    return (
        <div>
            <Table columns={columns} dataSource={source} />
        </div>
    )
}

export default ProviderHistory
