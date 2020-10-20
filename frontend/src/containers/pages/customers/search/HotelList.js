import { Card, Col, Empty, Row } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import CardResult from './CardResult'
import { SearchStore } from './ContextStore'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import MapResult from './map/MapResult'
import './hotelList.css'

export default function HotelList() {

    let history = useHistory()

    const myRef = useRef()

    const [scrollTop, setScrollTop] = useState(0)
    const { searchResult } = useContext(SearchStore)

    console.log(searchResult)

    const returnToHome = async () => {
        history.push('/home')
    }

    const scroll = (e) => {
        const scroll = myRef.current.scrollTop
        setScrollTop(scroll)
    }

    return (
        <Row justify="space-around">
            <Col span={6}>
                <Row justify="start">
                    <div className="pseudo-button" onClick={returnToHome} >
                        <ArrowLeftOutlined />
                    </div>
                </Row>
                <Row
                    justify="center"
                >
                    <div
                        ref={myRef}
                        className='scrollAble'
                        onScroll={e => scroll(e)}
                    >
                        {
                            searchResult?.length > 0 ?
                                searchResult.map(hotel => <CardResult hotel={hotel}></CardResult>)
                                :
                                <Empty />
                        }
                    </div>
                </Row>
            </Col>
            <Col span={18}>
                <Row>
                    <MapResult />
                </Row>
            </Col>
        </Row>
    )
}
