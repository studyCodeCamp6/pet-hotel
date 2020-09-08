import React, { useState, useEffect } from "react";
import { Table, Tag} from "antd";
import axios from "../../../config/axios";
import moment from "moment";

const columns = [
  {
    title: "Name",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "lastname",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title:"Ban Status",
    dataIndex:"BanStatus",
    key:"BanStatus"
  },
  {
    title: "pet name",
    dataIndex: "petName",
    key: "petName",
  },
  {
    title: "pet type",
    dataIndex: "breedType",
    key: "breedType",
  },
  {
    title: "weight",
    dataIndex: "weight",
    key: "weight",
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
            <Tag color={"blue"}> accept</Tag>
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

function Task_Providers() {
  let [bill, setBill] = useState([]);
  const fetchData = async () => {
    try {
      const targetBill = await axios.get(`/tasks/providers`);
      await setBill(...bill, targetBill.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("pet",bill.targetPet);

  let arrayData = [];
  if (bill.length !== 0) {
    for (let i = 0; i < bill.targetBill.length; i++) {
      arrayData = [
        ...arrayData,
        {
          key:i,
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

  return <Table columns={columns} dataSource={arrayData}/>;
}

export default Task_Providers;
