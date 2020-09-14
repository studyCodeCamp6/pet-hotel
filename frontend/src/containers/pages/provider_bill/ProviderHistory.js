import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import axios from '../../../config/axios';
import moment from "moment";

function ProviderHistory() {
    let [bill, setBill] = useState([]);
    let [allData, setAllData] = useState([]);

    const columns = [
        {
            title: "customer name",
            dataIndex: "customer_name",
            key: "customer_name",
        },
        {
            title: 'pet name',
            dataIndex: 'pet_name',
            key: 'pet_name'
        },
        {
            title: 'pet type',
            dataIndex: 'pet_type',
            key: 'pet_type'
        },
        
        {
            title: "date",
            dataIndex: "startDate",
            dataIndex: "endDate",
            key: "startDate",
            key: "endDate",
            render: (startDate, endDate) => (
                <>
                    <span>{moment(endDate).format("Do MMMM  h:mm a")}</span>{" - "}
                    <span>{moment(startDate).format("Do MMMM  h:mm a")}</span>
                </>
            )
        }
    ]
    const fetchData = async () => {
        try {
            const targetBill = await axios.get(`/tasks/providers`);
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
        customer_name : item.customerName,
        pet_name : item.pets_data,
        pet_type : item.pets_Breed
        
    }))
    console.log(bill)

    return (
        <div>
            <Table columns={columns} dataSource={source} />
        </div>
    )
}

export default ProviderHistory
