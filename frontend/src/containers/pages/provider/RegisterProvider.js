import React, { useState } from 'react'
import { Button, Form, Select, Input, notification } from 'antd'
import axios from '../../../config/axios'



function RegisterProvider() {
    const [data, setData] = useState([])

    const onFinish = async(values) => {
        const body = {
            hotelName: values.hotelName,
            address: values.address,
            phoneNumber: values.telephone,
            email: values.email,
            area: values.area,
            wage: values.wage,
            type: values.breedType
        }
        const newData = await axios.post('/providers/add',body )
        console.log(newData);
    }
    console.log(data);
    return (
        <div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 6 }}
                layout="horizontal"

                onFinish={onFinish}
                style={{
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <h1>Register Provider</h1>
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
                <Form.Item label="Area Of Hotel m<sup>2</sup>" name="area">
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">confirm</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterProvider
