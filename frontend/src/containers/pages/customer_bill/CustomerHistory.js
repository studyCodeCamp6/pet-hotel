import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import axios from '../../../config/axios';
import moment from "moment";

function CustomerHistory() {
    let [bill, setBill] = useState([]);
    let [allData, setAllData] = useState([]);

    const columns = [
        {
            title: "customer name",
            dataIndex: "customer_name",
            key: "customer_name",
        },
        {
            title: 'optionalServices',
            dataIndex: 'optional_Services',
            key: 'optional_Services'
        },
        {
            title: "date",
            dataIndex: "startDate",
            key: "startDate",
            render: (startDate, endDate) => (
                <>
                    <span>{moment(startDate).format("Do MMMM YYYY h:mm a")}</span>{" "}
                    <span>{moment(endDate).format("Do MMMM YYYY h:mm a")}</span>
                </>
            )
        }
    ]
    // const fetchData = async () => {
    //     try {
    //         // const targetBill = await axios.get(`/tasks/providers`);
    //         await setBill(...bill, targetBill.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    console.log("pet", bill.targetPet);

    let arrayData = [];
    if (bill.length !== 0) {
        for (let i = 0; i < bill.targetBill.length; i++) {
            arrayData = [
                ...arrayData,
                {
                    key: i,
                    customer_name: bill.billToCustomers[i][0].name,
                    lastName: bill.billToCustomers[i][0].lastName,
                    BanStatus: bill.billToCustomers[i][0].status,
                    petName: bill.targetPet[i][0].name,
                    breedType: bill.targetPet[i][0].breedType,
                    weight: bill.targetPet[i][0].weight,
                    startDate: bill.targetBill[i].startDate,
                    endDate: bill.targetBill[i].endtDate,
                    status: bill.targetBill[i].status,
                },
            ];
        }
    }

    return (
        <div>

            <Table columns={columns} dataSource={arrayData} />
        </div>
    )
}

export default CustomerHistory

