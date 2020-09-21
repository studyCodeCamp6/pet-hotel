import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Input, Form, Select, InputNumber, Upload, Button, Row, Col } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import jwtDecode from 'jwt-decode'
import List_Pets from './List_Pets';
import LocalStorage from '../../../services/LocalStorage'
import Booking_Pets from './Booking_Pets';

function Add_Pets(props) {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [pets, setPets] = useState([])
    const [keyPets, setKeyPets] = useState([])
    const [ID, setID] = useState('')
    const [stDate, setStDate] = useState('')
    const [enDate, setEnDate] = useState('')
    const [service, setService] = useState([])


    useEffect(() => {
        const token = LocalStorage.getToken()
        if (token) {
            const user = jwtDecode(token)
            setID(user.id)
        }
    }, [])



    const fetchDataPets = async () => {
        const newData = await axios.get('/pets')
        setData(newData.data)
    }

    useEffect(() => {
        fetchDataPets()
    }, [confirm])

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    let id = 0;

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const body = {
            // key,
            name: values.name,
            breedType: values.breedType,
            weight: values.weight,
            sex: values.sex,
            other: values.introduction,
            customer_id: ID
            // image: values.uploadImage,
            // certificate: values.uploadCertificate,
        }
        await axios.post('/pets/pets', { body })
        // setData(newData)
        setConfirm((pervState) => !pervState)
        // setKey(key + 1)
        setVisible(false);
    }

    const deletePets = async (id) => {
        const cloneData = [...data]
        console.log(id)
        console.log(cloneData)
        const newData = cloneData.filter(item => item.key !== id)
        console.log(newData)
        setData(newData)
        try {
            await axios.delete(`/pets/delete/${id}`)
            console.log('deleted')
        } catch (err) {
            console.log(err)
        }
        setConfirm((pervState) => !pervState)
    }

    const onChangeTimePicker = (value, dateString) => {
        setStDate(dateString[0])
        setEnDate(dateString[1])
        console.log('Selected Time: ', value);
    }

    const onChange = (checkedValues) => {
        setService(checkedValues)
    }

    const addKeyPets = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        setKeyPets(selectedRowKeys)
    }

    const confirmPets = async () => {
        const cloneData = [...keyPets]
        // console.log(cloneData)
        const cloneDataKeyPets = cloneData.map(key => ({pet_id : key}))
        console.log(cloneDataKeyPets)
        const cloneDataServices = [...service]
        const newServices =  cloneDataServices.map(item => ({ service_id: item }))
        console.log(newServices)
        const bodyDate = {
            startDate: stDate,
            endDate: enDate,
            provider_id: ID,
            status: 'waiting'
        }
        console.log(bodyDate)
        try {
            await axios.post('/pets', { cloneDataKeyPets, bodyDate, newServices })
            console.log('Add pets && Date && service Success')
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(data)
    console.log(stDate)
    console.log(enDate)
    console.log(service)


    return (
        <>
            <>
                <Row justify="center" >
                    <Col lg={15}>
                        <Row justify="center" >
                            <Col>
                                <h1>Pets Information</h1>
                            </Col>
                        </Row>
                        <Button shape="round" onClick={showModal}>+ Add Pets </Button>
                        <Row >
                            <Col md={18}>
                                <List_Pets
                                    data={data}
                                    deletePets={deletePets}
                                    pets={pets}
                                    stDate={stDate}
                                    enDate={enDate}
                                    onChangeTimePicker={onChangeTimePicker}
                                    addKeyPets={addKeyPets}
                                />
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col lg={18}>
                                <Booking_Pets
                                    onChange={onChange} />
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col>
                            
                                <Button shape="round" onClick={() => confirmPets()}>Confirm </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Modal
                    title="Create New Pet"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 15 }}
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
                            <Button type="primary" htmlType="submit" className="login-form-button">confirm</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>



        </>
    )
}

export default Add_Pets
