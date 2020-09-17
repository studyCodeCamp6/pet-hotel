import React, { useState } from 'react'
import { Input, Radio, Row, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export function SearchProviderByName() {
    const { Search } = Input

    return (
        <Search
            placeholder="search hotel name here..."
            onSearch={val => console.log(val)}
            enterButton
        />
    )
}

export function SearchProviderByType() {

    const [value, setValue] = useState(1)

    const onChange = (e) => {
        console.log('checked', e.target.value)
        setValue(e.target.value)
    }

    return (
        <Row align='middle'>
            <Radio.Group
                onChange={e => onChange(e)}
                value={value}
            >
                <Radio value={"CAT"}>Cat</Radio>
                <Radio value={"DOG"}>Dog</Radio>
                <Radio value={"CATANDDOG"}>Cat & dog</Radio>
            </Radio.Group>
            <Button
                shape="circle"
                icon={<SearchOutlined />}
            />
        </Row>
    )
}

export function SearchProviderByArea() {
    const { Search } = Input

    return (
        <Search
            placeholder="enter area you want to search ..."
            onSearch={value => console.log(value)}
            enterButton
        />
    )
}

export function SearchOptions(props) {
    const options = [
        { label: 'search by hotel name', value: 'hotel' },
        { label: 'search by pet type', value: 'type' },
        { label: 'search by area', value: 'area' }
    ]
    const [value, setValue] = useState('hotel')
    const { setSearchType } = props

    const onChange = (e) => {
        setValue(e.target.value)
        setSearchType(e.target.value)
    }
    return (
        <Radio.Group
            options={options}
            onChange={e => onChange(e)}
            value={value}
            optionType='button'
            buttonStyle='solid'
        />
    )
}
