import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd';

function EditProfileProvider(props) {
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit Profile
        </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form.Item label="Hotel name" name="hotelName">
                    <Input  />
                    {/* value={props.item.hotelName} */}
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
            </Modal>
        </>
    )
}

export default EditProfileProvider
