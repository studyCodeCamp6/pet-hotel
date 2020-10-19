import React, { useRef, useState } from 'react'
import { Comment, Empty, List, Rate } from 'antd'
import './hotelList.css'

function ReviewHotelModal(props) {

    const { review } = props
    const myRef = useRef()
    const [scrollTop, setScrollTop] = useState(0)

    const scroll = () => {
        const scrolling = myRef.current.scrollTop
        setScrollTop(scrolling)
    }
    return (
        <div
            ref={myRef}
            className='scrolling'
            onScroll={scroll}
        >
            {(review) ?
                <List
                    className="comment-list"
                    header={`${review.length} reviews`}
                    itemLayout="horizontal"
                    dataSource={review}
                    renderItem={(itm, id) => (
                        <li>
                            <Comment
                                avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                author={itm.username}
                                content={itm.comment}
                            >
                                <Rate disabled defaultValue={itm.score} allowHalf />
                            </Comment>
                        </li>
                    )}
                >
                </List>
                :
                <List
                    className="comment-list"
                    header={`0 reviews`}
                    itemLayout="horizontal"
                    renderItem={<Empty />}
                >
                </List>
            }
        </div>
    )
}

export default ReviewHotelModal
