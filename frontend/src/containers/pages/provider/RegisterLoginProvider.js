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
        console.log(values.username)
        const body = {
            hotelName: values.hotelName,
            phoneNumber: values.telephone,
            email: values.email,
            area: values.area,
            type: values.breedType,
            address: values.address,
            wage: values.wage
        }
        await axios.post('/providers/add', body)
    }

    const onFinishLast =  (values) => {
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
                <Form onFinish={onFinishFirst}>
                    <Row justify="center" style={{ margin: "20px" }}>
                        <img
                            style={{ width: "100%", maxWidth: "250px" }}
                            alt="logo"
                            src=""
                        />
                    </Row>

                    <Divider />

                    <h1>Information Provider</h1>
                    <Form.Item label="Hotel name" name="hotelName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Telephone" name="telephone">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Area Of Hotel(m²)" name="area">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Wage Rate (1 piece/Baht)" name="wage">
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
                        <Button htmlType="submit">ลงทะเบียน</Button>
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
                    <Button type="primary" >
                        Done
                    </Button>
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
