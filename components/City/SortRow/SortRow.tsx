import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Menu, Dropdown, Tabs } from 'antd'
import { SortByOptionsContainer } from 'components/City/Listings/styles'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
import { IantDesignEventObj } from 'interfaces/IantDesign'

const { TabPane } = Tabs

const AscendDescendTab: React.FC = () => {
  const appContext = useContext(AppContext)
  const { dispatch } = appContext
  const { setIsAscending } = ListingsSortFilterActions

  /* Tracks the active tab in reducer state */
  const handleTabClick = (key: string) => {
    let isAsc = key === 'sort-listings-ascending'
    dispatch(setIsAscending(isAsc))
  }

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabClick}>
      <TabPane tab="A-Z" key="sort-listings-ascending" />
      <TabPane tab="Z-A" key="sort-listings-descending" />
    </Tabs>
  )
}

//----------------------------------------------------------------
const SortByOptionsMenu: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { setActiveSortCategory } = ListingsSortFilterActions
  const { sortAndFilter, searchResults } = state

  const activeSortCAtegory = sortAndFilter.activeSort
  const handleSetActive = (e: IantDesignEventObj) => {
    dispatch(setActiveSortCategory(e.key, sortAndFilter, searchResults))
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
    <>
      <SortByOptionsContainer>
        <span>40 of 132 homes•</span>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={handleSetActive}>
            Sort: {activeSortCAtegory}
          </a>
        </Dropdown>
      </SortByOptionsContainer>
    </>
  )
}

export default SortByOptionsMenu
