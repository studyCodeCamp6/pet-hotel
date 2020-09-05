import React from 'react'
import Add_Pets from './Add_Pets'
import { Select } from 'antd'
import { Option } from 'antd/lib/mentions';

function Booking_Pets() {

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div>
            <Add_Pets/>
            <div>
                booking

               < Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select defaultValue="lucy" style={{ width: 120 }} disabled>
                    <Option value="lucy">Lucy</Option>
                </Select>
                <Select defaultValue="lucy" style={{ width: 120 }} loading>
                    <Option value="lucy">Lucy</Option>
                </Select>
                <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </div>
        </div >
    )
}

export default Booking_Pets
