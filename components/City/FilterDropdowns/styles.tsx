import React from 'react'
import styled from '@emotion/styled'
import { Menu, Dropdown, Row, Divider } from 'antd'
import 'antd/dist/antd.css'

export const FilterDropdownsContainer = styled.div`
  border: 3px solid blue;
  height: 5vh;
`

// export const DropDownMenu = styled((props)=>{
//     return <Dropdown overlay={menu}/>
// })``

export const DropDownButton = styled((props) => (
  <Dropdown {...props}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      Hover me
    </a>
  </Dropdown>
))``
