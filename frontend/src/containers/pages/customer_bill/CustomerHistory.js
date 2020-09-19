import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import axios from '../../../config/axios';
import moment from "moment";

function CustomerHistory() {
    let [bill, setBill] = useState([]);
    let [allData, setAllData] = useState([]);



    const columns = [
        {
            title: "Hotel name",
            dataIndex: "hotel_name",
            key: "hotel_name",
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Pet Name',
            dataIndex: 'pet_name',
            key: 'pet_name'
        },
        {
            title: 'Pet type',
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
            title: 'Total Cost',
            dataIndex: 'cost',
            key: 'cost'
        },
    ]

    const fetchData = async () => {
        try {
            const targetBill = await axios.get(`/histories/customers`);
            console.log(targetBill.data)
            setBill(targetBill.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(endDate,startDate)


    const source = bill.map((item, index) => ({
        key: index,
        startDate: item.startDate,
        endDate: item.endDate,
        hotel_name: item.hotelName,
        address: item.address,
        pet_name: item.petName,
        pet_type: item.petBreed,
        cost: item.cost,
        service : item.service

    })
    )
    console.log(source)


    return (
        <div>
            <Table columns={columns} dataSource={source} />
        </div>
    )
}

export default CustomerHistory

