import React from 'react'
import styled from '@emotion/styled'
import { Menu, Dropdown } from 'antd'
import { FilterButtonWrapper } from 'components/City/FilterDropdowns/styles'
import 'antd/dist/antd.css'

interface ImenuItem {
  id: string
  name: string
  onClick: () => void
}

interface Iprops {
  component?: JSX.Element
  menuList?: ImenuItem[]
  buttonName: string
}
export const DropDownMenuButton = styled((props: Iprops) => {
  const menu = (
    <Menu>
      {props.menuList &&
        props.menuList.map((item) => (
          <Menu.Item key={item.id}>
            <span onClick={item.onClick}>{item.name}</span>
          </Menu.Item>
        ))}
      <Menu.Item>{props.component && props.component}</Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <FilterButtonWrapper
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        {props.buttonName}
      </FilterButtonWrapper>
    </Dropdown>
  )
})``
