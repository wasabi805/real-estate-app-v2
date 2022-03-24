import React from 'react'
import styled from '@emotion/styled'
import { Menu, Dropdown, Row, Divider } from 'antd'
import 'antd/dist/antd.css'

export const FilterDropdownsContainer = styled.div`
  border: 3px solid blue;
  height: 5vh;
`

export const DropDownButton = styled((props) => {
  const menu = (
    <Menu>
      <Menu.Item>{props.component}</Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <text className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {props.buttonName}
      </text>
    </Dropdown>
  )
})``
