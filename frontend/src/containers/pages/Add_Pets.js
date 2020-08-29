import React, { useState } from 'react'
import axios from '../../config/axios'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Input, Form, Select, InputNumber, Upload, Button } from 'antd'
import Modal from 'antd/lib/modal/Modal';

function Add_Pets() {
    const [visible,setVisible] = useState( false)
    const showModal = () => {
        setVisible(true );
    };

    const handleOk = e => {
        setVisible( false );
    };

    const handleCancel = e => {
        setVisible( false );
    };

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const body = {
            name: values.name,
            breedType: values.breedType,
            weight: values.weight,
            sex: values.sex,
            image: values.uploadImage,
            certificate: values.uploadCertificate,
            other: values.introduction,
        }
        await axios.post('/pets/', body)
    }
    return (
        <>
            <>
                <Button type="primary" onClick={showModal}> Add Pets </Button>
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 6 }}
                        layout="horizontal"
                        initialValues={{ size: componentSize }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                        onFinish={onFinish}
                        style={{
                            width: "100%",
                            justifyContent: "center"
                        }}
                    >
                        <h2>Create New Pets</h2>
                        <Form.Item label="name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="breedType" name="breedType">
                            <Select>
                                <Select.Option value="DOG" name="DOG">Dog</Select.Option>
                                <Select.Option value="CAT" name="CAT">Cat</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="sex" name="sex">
                            <Select>
                                <Select.Option value="male" name="male">male</Select.Option>
                                <Select.Option value="female" name="female">female</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="weight (kg)" name="weight">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name="uploadImage"
                            label="Upload"
                            valuePropName="fileList"
                            // getValueFromEvent={normFile}
                            extra="entry image"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <UploadOutlined /> Click to upload
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="uploadCertificate"
                            label="Upload"
                            valuePropName="fileList"
                            // getValueFromEvent={normFile}
                            extra="entry certificate"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <UploadOutlined /> Click to upload
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name='introduction' label="other">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                confirm
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>



        </>
    )
}

export default Add_Pets
