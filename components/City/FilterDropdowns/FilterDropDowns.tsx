import React from 'react'
import { Menu, Dropdown, Row, Divider } from 'antd'
import { FilterDropdownsContainer } from 'components/City/FilterDropdowns/styles'
import { DropDownButton } from 'components/City/FilterDropdowns/styles'

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
  </Menu>
)

const FilterDropdowns = () => {
  return (
    <FilterDropdownsContainer>
      Filter Dropdowns
      <DropDownButton overlay={menu} />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdowns
