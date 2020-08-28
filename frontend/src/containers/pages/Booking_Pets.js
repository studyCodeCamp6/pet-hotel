import React, { useState, useEffect } from 'react'
import Add_Pets from './Add_Pets'
import { Row, Col, Checkbox, Space, DatePicker, Form, Input, Button, } from 'antd'
import axios from '../../config/axios'
const moment = require('moment')

function Booking_Pets(props) {

    const [stDate, setStDate] = useState('')
    const [enDate, setEnDate] = useState('')
    const [optEnt, setOptEnt] = useState([])
    const [optEnt1, setOptEnt1] = useState([])

    const onChangeTimePicker = (value, dateString) => {
        setStDate(dateString[0])
        setEnDate(dateString[1])
        console.log('Selected Time: ', value);
    }

    const onChangeOptional = (checkedValues) => {
        const newArray = [...optEnt,checkedValues]
        setOptEnt1(newArray)
        
        console.log('checked = ', checkedValues);
    }

    const { RangePicker } = DatePicker;
    const onOk = (value) => {
        console.log('onOk: ', value);
    }
    function disableDate(current) {
        console.log("a")
        let customDate = new Date()
        return current && current < moment(customDate, "YYYY-MM-DD")
    }

    const plainOptions = ['grooming', 'entertaining'];

    const onFinish = async (values) => {
        const body = {
            startDate: stDate,
            endDate: enDate,
            optionalServices: optEnt1
        }
        const newBills = await axios.post('/bills', body)
        console.log(newBills)
    }



    return (
        <Form onFinish={onFinish}>
            <br />
            <Row justify="center">
                <Col md={23}>
                    <h1>Booking Pets</h1>
                    <Add_Pets />
                </Col>
            </Row>
                    Duration limitation
            <br />
            <br />
            <Row justify="center">
                <Col md={6}>
                    <Space direction="vertical" size={18}>
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeTimePicker}
                            disableDate={disableDate}
                        // onOk={onOk}
                        />
                    </Space>
                </Col>
            </Row>
            <br />
            <br />
            Choose optional services
            <br />
            <br />
            <Row justify="center" style={{ marginBottom: "50px" }}>
                <Col md={6}>
                    <Checkbox.Group options={plainOptions} onChange={onChangeOptional} />
                    <br />
                    <br />
                    <Form.Item name='introduction' label="other">
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
            <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
        </Form>
    )
}

export default Booking_Pets
