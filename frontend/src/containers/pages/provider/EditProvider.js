import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios'
import { Descriptions, Badge, Button } from 'antd'
import EditProfileProvider from './EditProfileProvider'

function EditProvider() {
    const [dataProvider, setDataProvider] = useState([])
    const [dataProviderService, setDataProviderService] = useState([])
    const [deleteServiceProvider, setDeleteServiceProvider] = useState(false)

    console.log(dataProviderService)

    const fetchData = async () => {
        const httpData = await axios.get('/providers')
        setDataProvider(httpData.data)
    }

    const fetchDataService = async () => {
        const httpService = await axios.get('/providers/service')
        setDataProviderService(httpService.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchDataService()
    }, [deleteServiceProvider])


    const deleteService = async (id) => {
        await axios.delete(`/providers/service/${id}`)
        console.log(`id deleted: ${id}`)
        setDeleteServiceProvider((prevState) => !prevState)
    }



    return (
        <div>
            {dataProvider.map(item =>
                <Descriptions title="Provider Info" bordered>
                    <>
                        <Descriptions.Item label="Hotel Name" span={3}>{item.hotelName}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={3}>{item.address}</Descriptions.Item>
                        <Descriptions.Item label="Telephone" span={1}>{item.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>{item.email}</Descriptions.Item>
                        <Descriptions.Item label="Area of Hotel ( m² )" span={3}>{item.area}</Descriptions.Item>
                        <Descriptions.Item label="breedType" span={1}>{item.type}</Descriptions.Item>
                        <Descriptions.Item label="Wage Rate ( 1 piece/Baht )" span={1}>{item.wage}</Descriptions.Item>
                    </>
                </Descriptions>
            )}
            <EditProfileProvider
               
            />
            < Descriptions title="Service Info" bordered>
                <>
                    {dataProviderService.map(item =>
                        <Descriptions.Item label="Service" span={3}>{item.OptionalService.name}
                            <Button onClick={() => deleteService(item.id)}>Delete</Button>
                        </Descriptions.Item>
                    )}
                </>
            </Descriptions>
        </div>
    )
}

export default EditProvider
