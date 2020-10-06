import ChekoutCreditCard from '../../../Components/Checkout/CheckoutCreditcard';
import CheckoutInternetBanking from '../../../Components/Checkout/CheckoutInternetBanking';
import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Tag,
  Modal,
  Button,
  Row,
  Col,
  Rate,
  Input,
  notification,
} from 'antd';
import axios from '../../../config/axios';
import moment from 'moment';
import './task.css';

const { TextArea } = Input;
const updateBill = async (newstatus, billId) => {
  try {
    await axios.patch(`/tasks/customers/${billId}`, {
      status: newstatus,
    });
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  {
    title: 'Hotel Name',
    dataIndex: 'provider_name',
    key: 'provider_name',
    width: '15%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'pet name',
    dataIndex: 'petName',
    key: 'petName',
    width: '10%',
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
    title: 'cost',
    dataIndex: 'cost',
    key: 'cost',
    width: '15%',
    render: (cost) => {
      return cost.map((cost, key) => (
        <div key={key}>
          <Tag>{cost}</Tag>
        </div>
      ));
    },
  },
  {
    title: 'total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'start date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '15%',
    render: (startDate) => (
      <div>
        <div>{moment(startDate).format('Do MMMM YYYY')}</div>
        <div>{moment(startDate).format('h:mm a')}</div>
      </div>
    ),
  },
  {
    title: 'end date',
    dataIndex: 'endDate',
    key: 'endDate',
    width: '15%',
    render: (endDate) => (
      <>
        <div>{moment(endDate).format('Do MMMM YYYY')}</div>
        <div>{moment(endDate).format('h:mm a')}</div>
      </>
    ),
  },
  {
    title: 'status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <>
        {status === 'WAITING' ? (
          <>
            <span className={'status-green'}>waiting</span>
          </>
        ) : status === 'ACCEPT' ? (
          <>
            <span className={'status-yellow'}>accept</span>
          </>
        ) : status === 'CANCEL' ? (
          <>
            <span className={'status-grey'}>cancel</span>
          </>
        ) : status === 'REJECT' ? (
          <>
            <span className={'status-grey'}>reject</span>
          </>
        ) : status === 'CONFIRM' ? (
          <>
            <span className={'status-yellow'}>confirm</span>
          </>
        ) : status === 'ONTIME' ? (
          <>
            <span className={'status-yellow'}>ontime</span>
          </>
        ) : status === 'PROGRESS' ? (
          <>
            <span className={'status-yellow'}>progress</span>
          </>
        ) : status === 'ENDING' ? (
          <>
            <span className={'status-yellow'}>ending</span>
          </>
        ) : status === 'COMPLETE' ? (
          <>
            <span className={'status-yellow'}>complete</span>
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
  const [rowTask, setRowTask] = useState(false);

  const [billModal, setBillModal] = useState([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const [confirmSentpetModal, setConfirmSentpetModal] = useState(false);
  const [onProgressVisible, setOnProgressVisible] = useState(true);

  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState(null);
  const [reviewScore, setReviewScore] = useState(null);

  const [reviewFromDb, setReviewFromDb] = useState(null);

  const columnsModal = [
    {
      title: 'Hotel Name',
      dataIndex: 'provider_name',
      key: 'provider_name',
      fixed: 'left',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Wage',
      dataIndex: 'wage',
      key: 'wage',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Ban',
      dataIndex: 'statusBan',
      key: 'statusBan',
    },
    {
      title: 'cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => {
        return cost.map((cost, key) => (
          <div key={key}>
            <Tag>{cost}</Tag>
          </div>
        ));
      },
    },
    {
      title: 'pet name',
      dataIndex: 'petName',
      key: 'petName',
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
      title: 'pet type',
      dataIndex: 'petType',
      key: 'petType',
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
      title: 'pet Weight',
      dataIndex: 'petWeight',
      key: 'petWeight',
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
      title: 'pet Sex',
      dataIndex: 'petSex',
      key: 'petSex',
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
      title: 'pet Image',
      dataIndex: 'petImage',
      key: 'petImage',
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
      title: 'start date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => (
        <div>
          <div>{moment(startDate).format('Do MMMM YYYY')}</div>
          <div>{moment(startDate).format('h:mm a')}</div>
        </div>
      ),
    },
    {
      title: 'end date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => (
        <>
          <div>{moment(endDate).format('Do MMMM YYYY')}</div>
          <div>{moment(endDate).format('h:mm a')}</div>
        </>
      ),
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          {status === 'WAITING' ? (
            <>
              <span className={'status-green'}>waiting</span>
            </>
          ) : status === 'ACCEPT' ? (
            <>
              <span className={'status-yellow'}>accept</span>
            </>
          ) : status === 'CANCEL' ? (
            <>
              <span className={'status-grey'}>cancel</span>
            </>
          ) : status === 'REJECT' ? (
            <>
              <span className={'status-grey'}>reject</span>
            </>
          ) : status === 'CONFIRM' ? (
            <>
              <span className={'status-yellow'}>confirm</span>
            </>
          ) : status === 'ONTIME' ? (
            <>
              <span className={'status-yellow'}>ontime</span>
            </>
          ) : status === 'PROGRESS' ? (
            <>
              <span className={'status-yellow'}>progress</span>
            </>
          ) : status === 'ENDING' ? (
            <>
              <span className={'status-yellow'}>ending</span>
            </>
          ) : status === 'COMPLETE' ? (
            <>
              <span className={'status-yellow'}>complete</span>
            </>
          ) : (
            <div>something went wrong</div>
          )}
        </>
      ),
    },
    {
      title: 'total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      key: 'status',
      dataIndex: 'status',
      render: (status, billId, total) => {
        return (
          <>
            {status === 'WAITING' ? (
              <button
                color={'volcano'}
                onClick={() => updateBill('CANCEL', billId.billId)}
              >
                cancel
              </button>
            ) : status === 'ACCEPT' ? (
              <>
                <button
                  color={'blue'}
                  onClick={() => showModalPay(billId, total)}
                >
                  Pay
                </button>
                <Modal
                  visible={paymentModalVisible}
                  onOk={() => {
                    handleOkPay(billId);
                    handleCancelPay(false);
                    fetchData();
                  }}
                  onCancel={handleCancelPay}
                >
                  <div>
                    <div>are you sure you want to pay?</div>
                    <div>
                      <ChekoutCreditCard
                        cart={billId}
                        createCreditCardCharge={createCreditCardCharge}
                      />
                      <CheckoutInternetBanking
                        cart={billId}
                        createInternetBankingCharge={
                          createInternetBankingCharge
                        }
                      />
                    </div>
                  </div>
                </Modal>
              </>
            ) : status === 'CONFIRM' ? (
              billId.startDate.slice(0, -14) >=
                moment().format().slice(0, -15) &&
              billId.endDate.slice(0, -14) < moment().format().slice(0, -15) ? (
                <div>
                  <Modal
                    visible={confirmSentpetModal}
                    onOk={() => {
                      handleOkPay(billId);
                      handleCancleSentPet(true);
                      setOnProgressVisible(false);
                    }}
                    onCancel={handleCancleSentPet}
                  >
                    <div>are you sure you want to sent pet?</div>
                  </Modal>
                  {onProgressVisible ? (
                    <button onClick={() => setConfirmSentpetModal(true)}>
                      "sent pet"
                    </button>
                  ) : (
                    'on progress'
                  )}
                </div>
              ) : billId.endDate.slice(0, -14) >
                moment().format().slice(0, -15) ? (
                'ending'
              ) : (
                []
              )
            ) : status === 'ONTIME' ? (
              <div>
                <Modal
                  visible={confirmSentpetModal}
                  onOk={() => {
                    handleOkPay(billId);
                    handleCancleSentPet(true);
                    setOnProgressVisible(false);
                  }}
                  onCancel={handleCancleSentPet}
                >
                  <div>are you sure you want to sent pet?</div>
                </Modal>
                {onProgressVisible ? (
                  <button onClick={() => setConfirmSentpetModal(true)}>
                    "sent pet"
                  </button>
                ) : (
                  'on progress'
                )}
              </div>
            ) : status === 'PROGRESS' ? (
              []
            ) : status === 'ENDING' ? (
              <button onClick={updateBill('COMPLETE', billId.billId)}>
                get pet{' '}
              </button>
            ) : status === 'COMPLETE' ? (
              reviewFromDb?.bill_id === billId.billId ? (
                <Button disabled>Review</Button>
              ) : (
                <>
                  <Button type='primary' onClick={() => showModalReview()}>
                    Review
                  </Button>
                  <Modal
                    visible={showReview}
                    onOk={async () => {
                      await handelCreateReview(billId);
                      hideModalReview();
                      setRowTask(false);
                    }}
                    onCancel={hideModalReview}
                  >
                    <Row>
                      <Col>
                        <Row>
                          <h2>Review {billId.provider_name}</h2>
                        </Row>
                        <Row>
                          <Rate
                            style={{
                              fontSize: '36px',
                              marginTop: '10px',
                              color: '#F6AB4A',
                            }}
                            onChange={async (value) =>
                              await setReviewScore(value)
                            }
                          />
                        </Row>
                        <Row>
                          <TextArea
                            rows={10}
                            onChange={async (e) =>
                              await setReview(e.target.value)
                            }
                            value={review}
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Modal>
                </>
              )
            ) : (
              'something went wrong'
            )}
          </>
        );
      },
    },
  ];

  const handleOk = (e) => {
    setRowTask(false);
  };

  const handleCancel = (e) => {
    setRowTask(false);
  };

  const showModalPay = (bill, total) => {
    setPaymentModalVisible(bill.billId);
  };
  // Kanin
  const createCreditCardCharge = async (email, name, amount, token, billId) => {
    // setCart({ ...cart, token: token });
    // console.log(token);
    try {
      const res = await axios({
        method: 'POST',
        url: '/payment/checkout-credit-card',
        data: { email, name, amount, token, billId },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data) {
        setCharge(res.data);
        setType('Credit Card');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createInternetBankingCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/payment/checkout-internetBanking',
        data: { email, name, amount, token },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { authorizeUri } = res.data;

      if (authorizeUri) {
        window.location.href = authorizeUri;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Kanin
  const [charge, setCharge] = useState(undefined);
  const [type, setType] = useState('');
  const handleOkPay = (bill) => {
    /*
    This is For P'Kanin Only you
  
    =================================
    ====================== ==========
    ===================== ===========
    =================================
    =================================
    =================================
    =================================
    =================================
    
    */
    /*case pay success*/
    // const Paymentsuccess = async () => {
    //   try {
    //     await axios.patch(`/tasks/customers/${bill.billId}`, {
    //       status: 'CONFIRM',
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // Paymentsuccess();
    setPaymentModalVisible(false);
    setRowTask(false);
  };

  const handleCancelPay = (e) => {
    setPaymentModalVisible(false);
  };

  const handleCancleSentPet = (e) => {
    setConfirmSentpetModal(false);
    setRowTask(false);
  };

  const showModalReview = () => {
    setShowReview(true);
  };

  const hideModalReview = () => {
    setShowReview(false);
  };

  const handelCreateReview = async (bill) => {
    try {
      const payload = {
        review,
        score: reviewScore,
        bill_id: bill.billId,
        provider_id: bill.provider_id,
      };
      await axios.post('/bills/reviews', payload);
      setReview(null);
      notification.success({ message: 'hotel reviewed' });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || 'something went wrong',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const targetBill = await axios.get(`/tasks/customers`);
      setBill(targetBill.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReview = async (bill) => {
    const bill_id = Number(bill[0]);
    try {
      const getReview = await axios.get(`/bills/reviews/${bill_id}`);
      console.log(getReview.data);
      setReviewFromDb(getReview.data);
    } catch (er) {
      console.log(er);
    }
  };

  let newArrayData = [];

  if (bill.targetBill?.length > 0) {
    newArrayData = bill.targetBill.map((bill) => {
      return {
        key: Math.random(),
        billId: bill.id,
        provider_id: bill.Provider.id,
        provider_name: bill.Provider.hotelName,
        address: bill.Provider.address,
        phoneNumber: bill.Provider.phoneNumber,
        email: bill.Provider.email,
        area: bill.Provider.area,
        wage: bill.Provider.wage,
        type: bill.Provider.type,
        image: bill.Provider.image,
        statusBan: bill.Provider.status,
        startDate: bill.startDate,
        endDate: bill.endDate,
        status: bill.status,
        cost: bill.PetsBills.map((pet) => pet.cost),
        total: bill.PetsBills.map((pet) => pet.cost).reduce(
          (totalcost, cost) => {
            return totalcost + cost;
          },
          0
        ),
        petName: bill.PetsBills.map((pet) => pet.Pet.name),
        petType: bill.PetsBills.map((pet) => pet.Pet.breedType),
        petWeight: bill.PetsBills.map((pet) => pet.Pet.weight),
        petSex: bill.PetsBills.map((pet) => pet.Pet.sex),
        petImage: bill.PetsBills.map((pet) => pet.Pet.image),
      };
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={newArrayData}
        size='middle'
        width={200}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              event.preventDefault();
              setRowTask(true);
              setBillModal([newArrayData[rowIndex]]);
              fetchReview([newArrayData[rowIndex].billId]);
            },
          };
        }}
      />
      <Modal
        visible={rowTask}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Table
          columns={columnsModal}
          dataSource={billModal}
          pagination={false}
          scroll={{ x: 'calc(1000px + 50%)' }}
        />
      </Modal>
    </>
  );
}

export default Task_Customers;
