import React, { useState, useEffect } from "react";
import { Table, Tag} from "antd";
import axios from "../../config/axios";
import moment from "moment";

const columns = [
  {
    title: "Hotel Name",
    dataIndex: "provider_id",
    key: "provider_id",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "pet name",
    dataIndex: "petName",
    key: "petName",
  },
  {
    title: "pet type",
    dataIndex: "petType",
    key: "petType",
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
    ),
  },
  {
    title: "status",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <>
        {status === "WAITING" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              waiting
            </span>
            <Tag color={"volcano"}> cancle</Tag>
          </>
        ) : status === "ACCEPT" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : status === "REJECT" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : status === "CONFIRM" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : status === "ONTIME" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : status === "PROGRESS" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : status === "ENDING" ? (
          <>
            <span style={{ color: "yellowgreen", margin: "0 10% 0 0" }}>
              accept
            </span>
          </>
        ) : (
          <div>something went wrong</div>
        )}
      </>
    ),
  },
];

function Task_Customers() {
  let [bill, setBill] = useState([]);
  let [allData, setAllData] = useState([]);
  const fetchData = async () => {
    try {
      const targetBill = await axios.get(`/tasks/customers`);
      await setBill(...bill, targetBill.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let arrayData = [];
  let newArrayData = [];
  if (bill.length !== 0) {
    console.log(bill)
    for (let i = 0; i < bill.targetBill.length; i++) {
      let petCount = bill.billToPet[i].length;

        for (let j = 0; j < petCount; j++) {
          newArrayData = [
            ...newArrayData,
            {
              key: Math.random(),
              provider_id: bill.billToCustomers[i][0].hotelName,
              address: bill.billToCustomers[i][0].address,
              startDate: bill.targetBill[i].startDate,
              endDate: bill.targetBill[i].endtDate,
              status: bill.targetBill[i].status,
              petName: bill.billToPet[i][j]['Pet.name'],
              petType: bill.billToPet[i][j]['Pet.breedType'],
            },
          ];
      }
    }
  }

  return <Table columns={columns} dataSource={newArrayData} />;
}

export default Task_Customers;
