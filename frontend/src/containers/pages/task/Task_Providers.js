import React, { useState, useEffect } from "react";
import { Table, Tag, Modal } from "antd";
import axios from "../../../config/axios";
import moment from "moment";
import "./task.css";

const updateBill = async (newstatus, billId) => {
  try {
    console.log(billId);
    console.log(newstatus);
    await axios.patch(`/tasks/providers/${billId}`, {
      status: newstatus,
    });
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  {
    title: "bill number",
    dataIndex: "billId",
    key: "billId",
    width: "15%",
  },
  {
    title: "customer id",
    dataIndex: "customer_id",
    key: "customer_id",
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
    title: "cost",
    dataIndex: "cost",
    key: "cost",
    width: "15%",
    render: (cost) => {
      return cost.map((cost, key) => (
        <div key={key}>
          <Tag>{cost}</Tag>
        </div>
      ));
    },
  },
  {
    title: "total",
    dataIndex: "cost",
    key: "cost",
    width: "15%",
    render: (cost) => {
      return cost.reduce((totalCost, cost) => {
        return totalCost + cost;
      }, 0);
    },
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
            <span className={"status-grey"}>reject</span>
          </>
        ) : status === "CONFIRM" ? (
          <>
            <span className={"status-yellow"}>confirm</span>
          </>
        ) : status === "ONTIME" ? (
          <>
            <span className={"status-yellow"}>on time</span>
          </>
        ) : status === "PROGRESS" ? (
          <>
            <span className={"status-yellow"}>progress</span>
          </>
        ) : status === "ENDING" ? (
          <>
            <span className={"status-yellow"}>ending</span>
          </>
        ) : status === "COMPLETE" ? (
          <>
            <span className={"status-yellow"}>complete</span>
          </>
        ) : (
                            <div>something went wrong</div>
                          )}
      </>
    ),
  },
];

function Task_Providers() {
  const [bill, setBill] = useState([]);
  const [billModal, setBillModal] = useState([]);
  const [visible, setVisible] = useState(false);

  const [confirmGetPetModal, setConfirmGetPetModal] = useState(false);
  const [handleCancleSentPet, setHandleCancleSentPet] = useState(false);
  const [onProgressVisible, setOnProgressVisible] = useState(true);

  const columnsModal = [
    {
      title: "bil number",
      dataIndex: "billId",
      key: "billId",
      width: "15%",
    },
    {
      title: "customer id",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "lastname",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "cost",
      dataIndex: "cost",
      key: "cost",
      width: "15%",
      render: (cost) => {
        return cost.map((cost, key) => (
          <div key={key}>
            <Tag>{cost}</Tag>
          </div>
        ));
      },
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
              <span className={"status-grey"}>reject</span>
            </>
          ) : status === "CONFIRM" ? (
            <>
              <span className={"status-yellow"}>confirm</span>
            </>
          ) : status === "ONTIME" ? (
            <>
              <span className={"status-yellow"}>on time</span>
            </>
          ) : status === "PROGRESS" ? (
            <>
              <span className={"status-yellow"}>progress</span>
            </>
          ) : status === "ENDING" ? (
            <>
              <span className={"status-yellow"}>ending</span>
            </>
          ) : status === "COMPLETE" ? (
            <>
              <span className={"status-yellow"}>complete</span>
            </>
          ) : (
                              <div>something went wrong</div>
                            )}
        </>
      ),
    },
    {
      title: "total",
      dataIndex: "cost",
      key: "cost",
      width: "15%",
      render: (cost) => {
        return cost.reduce((totalCost, cost) => {
          return totalCost + cost;
        }, 0);
      },
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      width: "300px",
      render: (status, billId) => {
        return (
          <>
            {status === "WAITING" ? (
              <>
                <button
                  color={"yellow"}
                  onClick={() => updateBill("ACCEPT", billId.billId)}
                >
                  accept
                </button>
                <button
                  color={"volcano"}
                  onClick={() => updateBill("CANCEL", billId.billId)}
                >
                  reject
                </button>
              </>
            ) : status === "CONFIRM" ? (
              billId.startDate.slice(0, -14) <=
                moment().format().slice(0, -15) &&
                billId.endDate.slice(0, -14) >=
                moment().format().slice(0, -15) ? (
                  <div>
                    {onProgressVisible ? (
                      <button onClick={() => setConfirmGetPetModal(true)}>
                        "get pet"
                      </button>
                    ) : (
                        "on progress"
                      )}
                    <Modal
                      visible={confirmGetPetModal}
                      onOk={() => {
                        setHandleCancleSentPet(false);
                        setOnProgressVisible(false)
                        setConfirmGetPetModal(false)
                        updateBill("PROGRESS", billId.billId);
                      }}
                      onCancel={handleCancleSentPet}
                    >
                      <div>are you sure you want to get pet?</div>
                    </Modal>
                  </div>
                ) : billId.endDate.slice(0, -14) >
                  moment().format().slice(0, -15) ? (
                    "ending"
                  ) : (
                    []
                  )
            ) : status === "ONTIME" ? (
              <div>
                {onProgressVisible ? (
                  <button onClick={() => setConfirmGetPetModal(true)}>
                    "get pet"
                  </button>
                ) : (
                    "on progress"
                  )}
                <Modal
                  visible={confirmGetPetModal}
                  onOk={() => {
                    setHandleCancleSentPet(false);
                    setOnProgressVisible(false)
                    setConfirmGetPetModal(false)
                    updateBill("PROGRESS", billId.billId);
                  }}
                  onCancel={handleCancleSentPet}
                >
                  <div>are you sure you want to get pet?</div>
                </Modal>
              </div>
            ) : (
                    []
                  )}
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
  useEffect(() => {
    fetchData();
  }, [visible]);

  const fetchData = async () => {
    try {
      const targetBill = await axios.get(`/tasks/providers`);
      await setBill(targetBill.data);
    } catch (error) {
      console.log(error);
    }
  };

  let newArrayData = [];

  if (bill.targetBill?.length > 0) {
    newArrayData = bill.targetBill.map((bill) => {
      return {
        key: Math.random(),
        billId: bill.id,
        customer_id: bill.PetsBills.map((pet) => pet.Pet.Customer.id),
        name: bill.PetsBills.map((pet) => pet.Pet.Customer.name),
        lastName: bill.PetsBills.map((pet) => pet.Pet.Customer.lastName),
        phoneNumber: bill.PetsBills.map((pet) => pet.Pet.Customer.phoneNumber),
        email: bill.PetsBills.map((pet) => pet.Pet.Customer.email),
        Image: bill.PetsBills.map((pet) => pet.Pet.Customer.image),
        statusBan: bill.PetsBills.map((pet) => pet.Pet.Customer.status),
        startDate: bill.startDate,
        endDate: bill.endDate,
        status: bill.status,
        cost: bill.PetsBills.map((pet) => pet.cost),
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

export default Task_Providers;
