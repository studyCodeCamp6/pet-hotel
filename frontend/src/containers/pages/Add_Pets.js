import React, { useState } from 'react'
import axios from '../../config/axios'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Input, Form, Select, InputNumber, Upload, Button } from 'antd'

function Add_Pets() {
    const [name, setName] = useState('')
    const [breedType, setBreedType] = useState('')
    const [weight, setWeight] = useState(0)
    const [sex, setSex] = useState('')
    const [image, setImage] = useState('')
    const [other, setOther] = useState('')

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const normFile = e => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const body = {
            username: values.email,
            password: values.password,
            name: values.nickname
        }
    }

    const onSubmit = async () => {
        await axios.post('/pets', {
            name: name,
            breedType: breedType,
            weight: weight,
            sex: sex,
            image: image,
            other: other

        })


    }

    return (
        // <form onSubmit={onSubmit}>

        //     <input placeholder="name" onChange={(e) => setName(e.target.value)}></input>
        //     <input placeholder="weight" onChange={(e) => setWeight(e.target.value)}></input>
        //     <input placeholder="sex" onChange={(e) => setSex(e.target.value)}></input>
        //     <input placeholder="breedType" onChange={(e) => setBreedType(e.target.value)}></input>
        //     <input placeholder="image" onChange={(e) => setImage(e.target.value)}></input>
        //     <input placeholder="other" onChange={(e) => setOther(e.target.value)}></input>
        //     <button>accept</button>



        <>
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
                <Form.Item label="breedType" >
                    <Select>
                        <Select.Option value="DOG" name="DOG">Dog</Select.Option>
                        <Select.Option value="CAT" name="CAT">Cat</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="sex">
                    <Select>
                        <Select.Option value="male" name="male">male</Select.Option>
                        <Select.Option value="female" name="female">female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="weight (kg)" name="weight">
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="entry image"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <UploadOutlined /> Click to upload
                            </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="entry certificate"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <UploadOutlined /> Click to upload
                            </Button>
                    </Upload>
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="other">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        confirm
                        </Button>
                </Form.Item>
            </Form>


        </>
    )
}

export default Add_Pets
