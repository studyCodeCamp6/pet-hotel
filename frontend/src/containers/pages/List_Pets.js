import React, { useState, useEffect } from 'react'
import { Row, Col, Radio, Divider, Table } from 'antd';
import axios from '../../config/axios';

function List_Pets(props) {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [pets, setPets] = useState([])

    const fetchDataPets = async () => {
        const newData = await axios.get('/pets')
        setPets(newData.data)
    }

    // useEffect(() => {
    //     fetchDataPets()
    // }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            // disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    console.log(props.data)

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

    ]




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
                    }} columns={columns} dataSource={props.data}  />
                </Col>
            </Row>
        </div>
    )
}

export default List_Pets
