import React, { useState, useEffect } from "react";
import { Table, Tag, Modal} from "antd";
import axios from "../../../config/axios";
import moment from "moment";
import "./task.css";

const updateBill = async (newstatus, billId) => {
  try {
    console.log(billId);
    console.log(newstatus);
    await axios.patch(`/tasks/customers/${billId}`, {
      status: newstatus,
    });
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  {
    title: "Hotel Name",
    dataIndex: "provider_id",
    key: "provider_id",
    width: "15%",
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
    width: "10%",
    render: (petName) => (
      <>
        {petName === undefined
          ? false
          : petName.map((pet, idx) => {
              return (
                <div key={idx}>
                  {idx + 1}. <Tag>{pet}</Tag>
                </div>
              );
            })}
      </>
    ),
  },
  {
    title: "start date",
    dataIndex: "startDate",
    key: "startDate",
    width: "15%",
    render: (startDate) => (
      <div>
        <div>{moment(startDate).format("Do MMMM YYYY")}</div>
        <div>{moment(startDate).format("h:mm a")}</div>
      </div>
    ),
  },
  {
    title: "end date",
    dataIndex: "endDate",
    key: "endDate",
    width: "15%",
    render: (endDate) => (
      <>
        <div>{moment(endDate).format("Do MMMM YYYY")}</div>
        <div>{moment(endDate).format("h:mm a")}</div>
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
            <span className={"status-green"}>waiting</span>
          </>
        ) : status === "ACCEPT" ? (
          <>
            <span className={"status-yellow"}>accept</span>
          </>
        ) : status === "CANCEL" ? (
          <>
            <span className={"status-grey"}>cancel</span>
          </>
        ) : status === "REJECT" ? (
          <>
            <span className={"status-grey"}>accept</span>
          </>
        ) : status === "CONFIRM" ? (
          <>
            <span className={"status-yellow"}>accept</span>
          </>
        ) : status === "ONTIME" ? (
          <>
            <span className={"status-yellow"}>accept</span>
          </>
        ) : status === "PROGRESS" ? (
          <>
            <span className={"status-yellow"}>accept</span>
          </>
        ) : status === "ENDING" ? (
          <>
            <span className={"status-yellow"}>accept</span>
          </>
        ) : (
          <div>something went wrong</div>
        )}
      </>
    ),
  },
];



function Task_Customers() {
  const [bill, setBill] = useState([]);
  const [billModal, setBillModal] = useState([]);
  const [visible, setVisible] = useState(false);
  const [paymentModalVisible,setPaymentModalVisible] = useState(false)


  const columnsModal = [
    {
      title: "Hotel Name",
      dataIndex: "provider_id",
      key: "provider_id",
      fixed: "left",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Wage",
      dataIndex: "wage",
      key: "wage",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Ban",
      dataIndex: "statusBan",
      key: "statusBan",
    },
    {
      title: "pet name",
      dataIndex: "petName",
      key: "petName",
      render: (petName) => (
        <>
          {petName === undefined
            ? false
            : petName.map((pet, idx) => {
                return (
                  <div key={idx}>
                    {idx + 1}. <Tag>{pet}</Tag>
                  </div>
                );
              })}
        </>
      ),
    },
    {
      title: "pet type",
      dataIndex: "petType",
      key: "petType",
      render: (petType) => (
        <>
          {petType === undefined
            ? false
            : petType.map((pet, idx) => {
                return (
                  <div key={idx}>
                    {idx + 1}. <Tag>{pet}</Tag>
                  </div>
                );
              })}
        </>
      ),
    },
    {
      title: "pet Weight",
      dataIndex: "petWeight",
      key: "petWeight",
      render: (petWeight) => (
        <>
          {petWeight === undefined
            ? false
            : petWeight.map((pet, idx) => {
                return (
                  <div key={idx}>
                    {idx + 1}. <Tag>{pet}</Tag>
                  </div>
                );
              })}
        </>
      ),
    },
    {
      title: "pet Sex",
      dataIndex: "petSex",
      key: "petSex",
      render: (petSex) => (
        <>
          {petSex === undefined
            ? false
            : petSex.map((pet, idx) => {
                return (
                  <div key={idx}>
                    {idx + 1}. <Tag>{pet}</Tag>
                  </div>
                );
              })}
        </>
      ),
    },
    {
      title: "pet Image",
      dataIndex: "petImage",
      key: "petImage",
      render: (petImage) => (
        <>
          {petImage === undefined
            ? false
            : petImage.map((pet, idx) => {
                return (
                  <div key={idx}>
                    {idx + 1}. <Tag>{pet}</Tag>
                  </div>
                );
              })}
        </>
      ),
    },
    {
      title: "start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => (
        <div>
          <div>{moment(startDate).format("Do MMMM YYYY")}</div>
          <div>{moment(startDate).format("h:mm a")}</div>
        </div>
      ),
    },
    {
      title: "end date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => (
        <>
          <div>{moment(endDate).format("Do MMMM YYYY")}</div>
          <div>{moment(endDate).format("h:mm a")}</div>
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
              <span className={"status-green"}>waiting</span>
            </>
          ) : status === "ACCEPT" ? (
            <>
              <span className={"status-yellow"}>accept</span>
            </>
          ) : status === "CANCEL" ? (
            <>
              <span className={"status-grey"}>cancel</span>
            </>
          ) : status === "REJECT" ? (
            <>
              <span className={"status-grey"}>accept</span>
            </>
          ) : status === "CONFIRM" ? (
            <>
              <span className={"status-yellow"}>confirm</span>
            </>
          ) : status === "ONTIME" ? (
            <>
              <span className={"status-yellow"}>accept</span>
            </>
          ) : status === "PROGRESS" ? (
            <>
              <span className={"status-yellow"}>accept</span>
            </>
          ) : status === "ENDING" ? (
            <>
              <span className={"status-yellow"}>accept</span>
            </>
          ) : (
            <div>something went wrong</div>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      render: (status, billId,cost) => {
        return (
          <>
            {status === "WAITING" ? (
              <button><Tag
                color={"volcano"}
                onClick={() => updateBill("CANCEL", billId.billId)}
              >
                cancel
              </Tag>
              </button>
            ) : 
              status === "ACCEPT" ? (
                <>
               <button><Tag
                  color={"blue"}
                  onClick={this.showModalPay}
                >
                  CONFIRM
                </Tag>
                </button>
                <Modal visible={paymentModalVisible} onOk={handleCancelPay} onCancel={handleCancelPay}>
                    are you sure you want to pay?

                </Modal>
                </>
              ):"something wen wrong"
            }
          </>
        );
      },
    },
  ];

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const showModalPay = () => {
    this.setState({
      visible: true,
    });
  };

  const handleOkPay = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  const handleCancelPay = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, [visible]);

  const fetchData = async () => {
    try {
      const targetBill = await axios.get(`/tasks/customers`);
      await setBill(targetBill.data);
      console.log(targetBill)
    } catch (error) {
      console.log(error);
    }
  };

  let newArrayData = [];

  if (bill.length !== 0) {
    newArrayData = bill.targetBill.map((bill, idx) => {
      return {
        key: Math.random(),
        billId: bill.id,
        provider_id: bill.Provider.hotelName,
        address: bill.Provider.address,
        phoneNumber: bill.Provider.phoneNumber,
        email: bill.Provider.email,
        area: bill.Provider.area,
        wage: bill.Provider.wage,
        type: bill.Provider.type,
        image: bill.Provider.image,
        statusBan: bill.Provider.status,
        startDate: bill.startDate,
        endDate: bill.endtDate,
        status: bill.status,
        petName: bill.PetsBills.map((pet) => pet.Pet.name),
        petType: bill.PetsBills.map((pet) => pet.Pet.breedType),
        petWeight: bill.PetsBills.map((pet) => pet.Pet.weight),
        petSex: bill.PetsBills.map((pet) => pet.Pet.sex),
        petImage: bill.PetsBills.map((pet) => pet.Pet.image),
      };
    });
    console.log(billModal);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={newArrayData}
        size="middle"
        width={200}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event, record, rowInd) => {
              event.preventDefault();
              setVisible(true);
              setBillModal([newArrayData[rowIndex]]);
            },
          };
        }}
      />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Table
          columns={columnsModal}
          dataSource={billModal}
          pagination={false}
          scroll={{ x: "calc(1000px + 50%)" }}
        />
      </Modal>
    </>
  );
}

export default Task_Customers;
