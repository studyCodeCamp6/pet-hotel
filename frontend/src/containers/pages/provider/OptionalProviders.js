import React, { useState } from 'react'
import { Form, Input, Button, Table, Row, Col } from 'antd'

import axios from '../../../config/axios'

function OptionalProviders(props) {
    const [option, setOption] = useState('')
    // const [optional, setOptional] = useState([])


    const setFunction = () => {
        optionalConfirm()
        props.setService(props.optional)
    }

    const optionalConfirm = async () => {
        // console.log(optional)
        const cloneData = [...props.optional]
        const newData = cloneData.map(item => ({ name: item.name }))
        console.log(newData)
        await axios.post('/optionals', { name: newData })

    }

    return (
        <div>
            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col xs={23} sm={20} md={20} lg={12} xl={10}>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 6 }}
                        layout="horizontal"
                        onFinish={props.onFinishLast}
                        style={{
                            width: "100%",
                            justifyContent: "center"
                        }}
                    >
                        <h1>Optional Services</h1>
                        <Form.Item label="Optional" name="optional" value={option}>
                            <Input />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">confirm</Button>

                        <Table dataSource={props.optional} columns={props.columns} />

                        <Button onClick={() => setFunction()}>Confirm</Button>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default OptionalProviders
