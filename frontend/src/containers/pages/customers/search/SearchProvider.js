import React, { useState } from 'react'
import { Input, Radio, Row, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import axios from '../../../../config/axios'
import { useHistory } from 'react-router-dom'

const { Search } = Input

export function SearchProviderByName(props) {
    const { setSearchResult } = props
    const [searchVal, setSearchVal] = useState(null)
    const history = useHistory();

    const searchName = async (val) => {
        const resultList = await axios.get(`/customers/hotels/${val}`)
        setSearchResult(resultList.data)
        setSearchVal(null)
        history.push('/hotel/lists')
    }

    return (
        <Search
            placeholder="search hotel name here..."
            onSearch={val => searchName(val)}
            onChange={e => setSearchVal(e.target.value)}
            value={searchVal}
            enterButton
            allowClear
        />
    )
}

export function SearchProviderByType(props) {

    const { setSearchResult } = props
    const [type, setType] = useState(null)
    const history = useHistory();

    const onChange = (e) => {
        console.log('checked', e.target.value)
        setType(e.target.value)
    }

    const searchType = async () => {
        const typeList = await axios.get(`/customers/types/${type}`)
        setSearchResult(typeList.data)
        history.push('/hotel/lists')
    }

    return (
        <Row align='middle'>
            <Radio.Group
                onChange={e => onChange(e)}
                value={type}
            >
                <Radio value={"CAT"}>Cat</Radio>
                <Radio value={"DOG"}>Dog</Radio>
                <Radio value={"CATANDDOG"}>Cat & dog</Radio>
            </Radio.Group>
            <Button
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => searchType()}
            />
        </Row>
    )
}

export function SearchProviderByArea(props) {
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
        // { label: 'search by area', value: 'area' }
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
