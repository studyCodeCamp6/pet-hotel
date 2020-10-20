import React, { useEffect, useState } from 'react'
import { Button, Card, Rate } from 'antd'
import HotelDetailModal from './HotelDetailModal'
import axios from '../../../../config/axios'
import Geocode from 'react-geocode'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API)
Geocode.setLanguage('th')

export default function CardResult(props) {

    const { hotel } = props
    const [showDetail, setShowDetail] = useState(false)
    const [rate, setRate] = useState(null)
    const [hotelReview, setHotelReview] = useState(null)
    const [address, setAddress] = useState(null)
    console.log(hotel)

    const lat = hotel.latitude,
        lng = hotel.longitude;

    const createBill = async () => {

    }

    const hotelDetail = async () => {
        setShowDetail(true)
    }

    const handleBookingOk = () => {
        setShowDetail(false)
    }

    const handleBookingCancel = () => {
        setShowDetail(false)
    }

    const reviews = hotel.Reviews
    const rateAvg = () => {
        if (reviews.length) {
            let score = reviews.map(review => review.score)
            setRate(score.reduce((a, b) => (Number(a) + Number(b)) / score.length))
        }
    }

    const hotelComment = () => {
        if (reviews.length) {
            let commentData = [],
                username = reviews.map(review => review.Bill.Customer.username),
                comment = reviews.map(review => review.comment),
                score = reviews.map(review => review.score),
                findLength = [],
                lengthResult;

            findLength.push(username.length, comment.length, score.length)
            lengthResult = findLength.indexOf(Math.max(...findLength))
            for (let i = 0; i < findLength[lengthResult]; i++) {
                commentData.push({
                    username: (username[i]) ? username[i] : '',
                    comment: (comment[i]) ? comment[i] : '',
                    score: (score[i]) ? score[i] : ''
                })
            }
            setHotelReview(commentData)
        }
    }

    useEffect(() => {
        rateAvg()
        hotelComment()
    }, [])

    Geocode.fromLatLng(lat, lng).then(
        response => {
            setAddress(response.results[0].formatted_address)
            console.log(address)
        },
        error => {
            console.log(error)
        }
    )

    return (
        <Card
            key={hotel.id}
            hoverable
            style={{ width: '300px' }}
            title={hotel?.hotelName}
            extra={<Button onClick={hotelDetail}>Booking</Button>}
        >
            <HotelDetailModal
                hotel={hotel}
                showDetail={showDetail}
                handleBookingOk={handleBookingOk}
                handleBookingCancel={handleBookingCancel}
                rate={rate}
                review={hotelReview}
                address={address}
            />
            <p>type: {(hotel?.type === "CATANDDOG") ? 'cat & dog' : hotel?.type?.toLowerCase()}</p>
            <p>address: {address} </p>
            <p>price(1 cat or dog/days): {hotel?.wage}</p>
            rating: {(rate) ? <Rate disabled={true} value={rate} allowHalf /> : <Rate disabled={true} value={0} />}
        </Card>
    )
}
