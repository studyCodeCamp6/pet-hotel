import React, { useState, useEffect } from 'react'
import { Row, Col, Checkbox, Form, } from 'antd'
import axios from '../../../config/axios'
// import jwtDecode from 'jwt-decode'
// import LocalStorage from '../../../services/LocalStorage'
// import Item from 'antd/lib/list/Item'


function BookingPets(props) {
    const [dataService, setDataService] = useState([])
    // const [ID, setID] = useState(0)

    // useEffect(() => {
    //     const token = LocalStorage.getToken()
    //     if (token) {
    //         const user = jwtDecode(token)
    //         setID(user.id)
    //     }
    // }, [])

    const fetchService = async () => {
        const httpData = await axios.get('/providers/service')
        console.log(httpData.data)
        setDataService(httpData.data)
    }

    useEffect(() => {
        fetchService()
    }, [])



    // const onFinish = async () => {
    //     const cloneData = [...service]
    //     const newServices = cloneData.map(item => ({ service_id: item }))
    //     console.log(newServices)
    //     try {
    //         const newData = await axios.post('/pets', { newServices })
    //         console.log(newData)
    //     }catch(err){
    //         console.log(err)
    //     }

    // }


    // const onChange = (checkedValues) => {
    //     setService(checkedValues)
    // }

    const plainOptions = dataService?.map(item => ({ label: item.OptionalService.name, value: item.OptionalService.id }))



    return (
        <Form >
            <br />
            <Row justify="center">
                <Col md={15}>
                    <h1>Choose optional services</h1>
                </Col>
            </Row>
            <br />
            <br />

            <Row justify="center" style={{ marginBottom: "50px" }}>
                <Col lg={18}>
                    <Checkbox.Group options={plainOptions} onChange={props.onChange} />
                </Col>
            </Row>
            {/* <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button> */}
        </Form >
    )
}


export default BookingPets
