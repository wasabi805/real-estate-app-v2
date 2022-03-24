import React from 'react'
import styled from '@emotion/styled'
import { Menu, Dropdown } from 'antd'
import 'antd/dist/antd.css'

interface Iprops {
  component: JSX.Element
  buttonName: string
}
export const DropDownMenuButton = styled((props: Iprops) => {
  const menu = (
    <Menu>
      <Menu.Item>{props.component}</Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <p className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {props.buttonName}
      </p>
    </Dropdown>
  )
})``
