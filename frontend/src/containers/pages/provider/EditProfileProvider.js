import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select, Tooltip } from 'antd';
import axios from '../../../config/axios';
import jwtDecode from 'jwt-decode'
import LocalStorage from '../../../services/LocalStorage';


function EditProfileProvider(props) {
    const [visible, setVisible] = useState(false)
    const [ID, setID] = useState('')

    useEffect(() => {
        const token = LocalStorage.getToken()
        if (token) {
            const user = jwtDecode(token)
            setID(user.id)
        }
    }, [])

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = async (values) => {
        const body = {
            hotelName: values.hotelName,
            phoneNumber: values.telephone,
            email: values.email,
            area: values.area,
            type: values.breedType,
            address: values.address,
            wage: values.wage
        }
        props.updateInformation(body)
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}> Edit Profile </Button>
            <Modal
                title="Update Information for Provider"
                visible={visible}
                onCancel={handleCancel}
            >
                <Form onFinish={handleOk}>
                    <Form.Item label="Hotel name" name="hotelName" >
                        <Input defaultValue={props.item.hotelName} />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input defaultValue={props.item.address} />
                    </Form.Item>
                    <Form.Item label="Telephone" name="telephone">
                        <Input defaultValue={props.item.phoneNumber} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input defaultValue={props.item.email} />
                    </Form.Item>
                    <Form.Item label="Area Of Hotel" name="area" >
                        <Input defaultValue={props.item.area} suffix="m²" />
                    </Form.Item>
                    <Form.Item label="Wage Rate (1 piece/Baht)" name="wage" >
                        <Input defaultValue={props.item.wage} suffix="BTH" />
                    </Form.Item>
                    <Form.Item label="breedType" name="breedType">
                        <Select defaultValue={props.item.type}>
                            <Select.Option value="DOG" name="DOG">Dog</Select.Option>
                            <Select.Option value="CAT" name="CAT">Cat</Select.Option>
                            <Select.Option value="CATANDDOG" name="CATANDDOG">Cat && Dog</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditProfileProvider
