import React, { useState } from 'react'
import { Form, Input, Button, Table } from 'antd'
import uid from 'uid';
import axios from '../../../config/axios'

function OptionalProviders(props) {
    const [option, setOption] = useState('')
    const [price, setPrice] = useState('')
    const [optional, setOptional] = useState([])



    const onFinishLast = async(values) => {
        const bodyLast = {
            key: uid(),
            name: values.optional,
            price: values.price
        }
        const newData = [...optional, bodyLast]
        console.log(values.optional)
        // await axios.post('/optionals', newData)
        setOptional(newData)
    }

    const optionalConfirm = async() => {
        try {
            await axios.post('/optionals', optional)
            console.log(optional)
        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 6 }}
                layout="horizontal"
                onFinish={onFinishLast}
                style={{
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <h1>Optional Services</h1>
                <Form.Item label="Optional" name="optional" value={option}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price (1 piece / Baht)" name="price" value={price}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">confirm</Button>

                <Table dataSource={optional} columns={props.columns} />

                <Button onClick={() => optionalConfirm()}>Confirm</Button>

            </Form>
        </div>
    )
}

export default OptionalProviders
