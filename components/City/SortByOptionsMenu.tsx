import React from 'react'
import { Menu, Dropdown } from 'antd'
import { SortByOptionsContainer } from './styles'

const SortByOptionsMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item
        //   icon={<DownOutlined />}
        disabled
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  )

  return (
    <SortByOptionsContainer>
      <span>40 of 132 homes•</span>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Sort: Price
        </a>
      </Dropdown>
    </SortByOptionsContainer>
  )
}

export default SortByOptionsMenu
