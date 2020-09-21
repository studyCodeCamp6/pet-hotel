import React, { useState } from 'react'
import axios from '../../../config/axios'
import uid from 'uid';

import { Steps, Button, Row, Col, Form, Input, notification, message, Select, Table, Space, Divider } from 'antd';
import OptionalProviders from './OptionalProviders';
const { Step } = Steps;

function RegisterLoginProvider() {
    const [current, setCurrent] = useState(0)
    const [dataService, setDataService] = useState([])
    const [data, setData] = useState([])
    const [optional, setOptional] = useState([])

    const onFinishFirst = async (values) => {
        const body = {
            hotelName: values.hotelName,
            phoneNumber: values.telephone,
            email: values.email,
            area: values.area,
            type: values.breedType,
            address: values.address,
            wage: values.wage
        }
        console.log(body)

        try {
            await axios.post('/providers/new/hotel', body)
            notification.success({
                message: "register as hotel provider successfully"
            })
        } catch (error) {
            notification.error({
                message: error.response?.data?.message || 'failed to register'
            })
        }

    }

    const onFinishLast = (values) => {
        const bodyLast = {
            key: uid(),
            name: values.optional,
        }
        const newData = [...optional, bodyLast]
        setOptional(newData)
    }

    const steps = [
        {
            title: 'Information Provider',
            content: 'First-content',
        },

        {
            title: 'Optional Services',
            content: 'Last-content',
        },
    ];

    const columns = [

        {
            title: 'Optional',
            dataIndex: 'name',
            key: 'optional'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space side='middle'>
                    <a onClick={() => {
                        const newOptional = [...optional]
                        const data = newOptional.filter(item => item.key !== record.key)
                        setOptional(data)
                    }}>Delete</a>
                </Space>
            )
        },
    ]



    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const pageFirst = (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Col xs={23} sm={20} md={20} lg={12} xl={10}>
                <Form
                    onFinish={onFinishFirst}>
                    <Row justify="center" style={{ margin: "20px" }}>
                        <img
                            style={{ width: "100%", maxWidth: "250px" }}
                            alt="logo"
                            src={require("../pic/hotel_logo_black.png")}
                        />
                    </Row>

                    <Divider />

                    <h1>Information Provider</h1>
                    <Form.Item
                        label="Hotel name"
                        name="hotelName"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "please input hotel name!!",
                        //     },
                        //     {
                        //         validator(rule, val) {
                        //             let regex = /^[a-z0-9_-]{3,}$/;
                        //             if (regex.test(val) && val) {
                        //                 return Promise.resolve()
                        //             } else {
                        //                 return Promise.reject("hotel name should contain at least 3 characters or numbers")
                        //             }
                        //         }
                        //     }
                        // ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Telephone"
                        name="telephone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone number!",
                            },
                            {
                                validator(rule, val) {
                                    let regex = /^[0-9]{9,10}$/;
                                    if (regex.test(val) && val) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject("phone number should contain 9-10 numbers")
                                    }
                                }
                            }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            },
                            {
                                validator(rule, val) {
                                    let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
                                    if (regex.test(val) && val) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject("this is not email format")
                                    }
                                }
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Area Of Hotel(m²)"
                        name="area"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Please input your hotel area!",
                    //     },
                    //     {
                    //         validator(rule, val) {
                    //             let regex = /^[0-9]$/
                    //             if (regex.test(val) && val) {
                    //                 return Promise.resolve()
                    //             } else {
                    //                 return Promise.reject("hotel area should contain numbers")
                    //             }
                    //         }
                    //     }
                    // ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Wage Rate (1 dog or cat/Baht)"
                        name="wage"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Please input your Wage Rate!",
                    //     },
                    //     {
                    //         validator(rule, val) {
                    //             let regex = /^[0-9]{9,10}$/
                    //             if (regex.test(val) && val) {
                    //                 return Promise.resolve()
                    //             } else {
                    //                 return Promise.reject("Wage Rate should contain numbers")
                    //             }
                    //         }
                    //     }
                    // ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="breedType" name="breedType">
                        <Select>
                            <Select.Option value="DOG" name="DOG">Dog</Select.Option>
                            <Select.Option value="CAT" name="CAT">Cat</Select.Option>
                            <Select.Option value="CATANDDOG" name="CATANDDOG">Cat && Dog</Select.Option>
                        </Select>
                    </Form.Item>


                    <Row justify="center">
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Row>
                </Form>
            </Col>
        </Row>)


    const lastPage = (
        <OptionalProviders
            columns={columns}
            onFinishLast={onFinishLast}
            optional={optional}
        />

    )

    // console.log(data)
    const component = [pageFirst, lastPage]

    return (
        <>
            <>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* <div className="steps-content">{steps[current].content}</div> */}
            </>


            {component[current]}



            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <></>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
}

export default RegisterLoginProvider
