import React, { useState, useContext } from 'react'
import AppContext from 'context/appContext'
import { Menu, Dropdown, Tabs } from 'antd'
import { SortByOptionsContainer } from './styles'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { SORT_LISTING_CATEGORIES } from 'strings'
import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'

const { TabPane } = Tabs

const AscendDescendTab = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { setIsAscending, updateListingsByAscOrDesc } =
    ListingsSortFilterActions

  const handleTabClick = (key: string) => {
    // const { data } = state.searchResults
    // const { activeSort } = state.sortAndFilter
    let isAsc = key === 'sort-listings-ascending'
    alert('asc desc tab clicked')
    dispatch(setIsAscending(isAsc))
    // dispatch(updateListingsByAscOrDesc(isAsc, activeSort, data))
  }

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabClick}>
      <TabPane tab="A-Z" key="sort-listings-ascending" />
      <TabPane tab="Z-A" key="sort-listings-descending" />
    </Tabs>
  )
}

const SortByOptionsMenu = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { setActiveSortCategory } = ListingsSortFilterActions

  const activeSortCAtegory = state.sortAndFilter.activeSort
  const handleSetActive = (e: string) => {
    dispatch(setActiveSortCategory(e.key))
  }

  const menu = (
    <Menu>
      <AscendDescendTab />
      {SORT_BY_LISTING_CATEGORIES.map((category) => (
        <Menu.Item key={category.value} onClick={handleSetActive}>
          {category.value}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <SortByOptionsContainer>
      <span>40 of 132 homes•</span>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={handleSetActive}>
          Sort: {activeSortCAtegory}
        </a>
      </Dropdown>
    </SortByOptionsContainer>
  )
}

export default SortByOptionsMenu
