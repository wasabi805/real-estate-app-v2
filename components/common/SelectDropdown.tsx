import React from 'react'
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;
const SelectDropdown = ({buttonName, component})=>{
    return(
        <Select 
            defaultValue={ buttonName } dropdownRender={()=><>{component}</>}>
        </Select>
    )
}

export default SelectDropdown