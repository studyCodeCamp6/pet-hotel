import React, { useState } from 'react'
import { Avatar, Comment, Modal, Rate } from 'antd'
import ReviewHotelModal from './ReviewHotelModal'
import { useHistory } from 'react-router-dom'

export default function HotelDetailModal(props) {

    const { hotel,
        showDetail,
        handleBookingCancel,
        rate,
        review,
        address } = props

    let history = useHistory();

    const createBill = () => {
        history.push('/pets/add', { hotelId: hotel.id })
    }

    return (
        <Modal
            title={`${hotel.hotelName}'s detail`}
            visible={showDetail}
            onOk={createBill}
            onCancel={handleBookingCancel}
            okText='Booking'
        >
            <p>type: {(hotel?.type === "CATANDDOG") ? 'cat & dog' : hotel?.type?.toLowerCase()}</p>
            <p>address: {address}</p>
            <p>price(1 cat or dog/days): {hotel?.wage}</p>
            rating: {(rate) ? <Rate disabled={true} value={rate} allowHalf /> : <Rate disabled={true} value={0} />}
            <ReviewHotelModal review={review} />
        </Modal>
    )
}
