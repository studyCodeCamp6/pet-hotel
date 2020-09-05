import React, { useState, useEffect } from 'react'
import { Row, Col, Radio, Divider, Table, Space, Button, DatePicker } from 'antd';

function List_Pets(props) {
    const [selectionType, setSelectionType] = useState('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'BreedType',
            dataIndex: 'breedType',
            key: 'breedType'
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex'
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight'
        },
        {
            title: 'Other',
            dataIndex: 'other',
            key: 'other'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <a onClick={() => props.deletePets(text.key)}>Delete</a>
                </Space>
            ),
        },

    ]

    const { RangePicker } = DatePicker;

    return (
        <div>
            <Row justify="center">
                <Col md={12}>
                    <Radio.Group
                        onChange={({ target: { value } }) => {
                            setSelectionType(value);
                        }}
                        value={selectionType}
                    >
                    </Radio.Group>

                    <Divider />

                    <Table rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }} columns={columns} dataSource={props.data} />
                </Col>

            </Row>
            <Row justify="center">
                <Col lg={10}>
                    <h1>setDate</h1>
                    <Space direction="vertical" size={18}>
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            onChange={props.onChangeTimePicker}
                        />
                    </Space>
                </Col>
            </Row>

        </div>
    )
}

export default List_Pets
