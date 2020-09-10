import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios'
import { Descriptions, Badge, Button, Row, Col } from 'antd'
import EditProfileProvider from './EditProfileProvider'
import jwtDecode from 'jwt-decode'
import LocalStorage from '../../../services/LocalStorage'

function EditProvider() {
    const [dataProvider, setDataProvider] = useState([])
    const [dataProviderService, setDataProviderService] = useState([])
    const [deleteServiceProvider, setDeleteServiceProvider] = useState(false)
    const [dataInformation, setInformation] = useState(false)
    const [ID, setID] = useState('')

    console.log(dataProvider)

    const fetchData = async () => {
        const httpData = await axios.get('/providers')
        const newData = [httpData.data]
        setDataProvider(newData)
    }

    const fetchDataService = async () => {
        const httpService = await axios.get('/providers/service')
        setDataProviderService(httpService.data)
    }

    useEffect(() => {
        fetchData()
    }, [dataInformation])

    useEffect(() => {
        fetchDataService()
    }, [deleteServiceProvider])

    useEffect(() => {
        const token = LocalStorage.getToken()
        if (token) {
            const user = jwtDecode(token)
            setID(user.id)
        }
    }, [])

    const updateInformation = async (body) => {
        try {
            await axios.put(`/providers/service/${ID}`, body)
            console.log("Update Information Success")
        } catch (err) {
            console.log(err)
        }
        setInformation((prevState) => !prevState)
    }


    const deleteService = async (id) => {
        await axios.delete(`/providers/service/${id}`)
        console.log(`id deleted: ${id}`)
        setDeleteServiceProvider((prevState) => !prevState)
    }





    return (
        <div>
            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col xs={23} sm={20} md={20} lg={20} xl={20}>
                    {dataProvider.map(item =>
                        <>
                            <Descriptions title="Provider Info" bordered>
                                <Descriptions.Item label="Hotel Name" span={3}>{item.hotelName}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={3}>{item.address}</Descriptions.Item>
                                <Descriptions.Item label="Telephone" span={1}>{item.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="Email" span={2}>{item.email}</Descriptions.Item>
                                <Descriptions.Item label="Area of Hotel" span={3} suffix="m²">{item.area}</Descriptions.Item>
                                <Descriptions.Item label="BreedType" span={1}>{item.type}</Descriptions.Item>
                                <Descriptions.Item label="Wage Rate ( 1 piece/Baht )" suffix="BTH" span={1}>{item.wage}</Descriptions.Item>
                            </Descriptions>
                            <EditProfileProvider
                                item={item}
                                updateInformation={updateInformation}
                            />
                        </>
                    )}
                    < Descriptions title="Service Info" bordered>
                        <>
                            {dataProviderService.map(item =>
                                <Descriptions.Item label="Service" span={3}>
                                    <Row justify="space-between">
                                        <Col style={{ marginTop: '5px' }}>
                                            {item.OptionalService.name}
                                        </Col>
                                        <Col >
                                            <Button onClick={() => deleteService(item.id)}>Delete</Button>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            )}
                        </>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

export default EditProvider
