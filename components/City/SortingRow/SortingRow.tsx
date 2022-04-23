import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Menu, Dropdown, Tabs } from 'antd'
import { SortByOptionsContainer } from '../styles'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortListings'
import * as ListingsActions from 'actions/ListingsActions'
import * as SortListingsActions from 'actions/ListingsActions/SortListings'
import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
import { IantDesignEventObj } from 'interfaces/IantDesign'
import DropdownButton from '@components/_common/DropdownButton'

const { TabPane } = Tabs

const { toggleSortListingsPanel: toggleSortPanel } = SortListingsActions

export const AscendDescendTab: React.FC = () => {
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
const SortingRow: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { setActiveSortCategory } = ListingsSortFilterActions
  const { homesViewTabClicked } = ListingsActions

  const { sortAndFilter, searchResults } = state
  const { toggleSortListingsPanel } = SortListingsActions

  const handleSetActive = (e: IantDesignEventObj) => {
    dispatch(setActiveSortCategory(e.key, sortAndFilter, searchResults))
  }

  // const menu = (
  //   <Menu>
  //     <AscendDescendTab />
  //     {SORT_BY_LISTING_CATEGORIES.map((category) => (
  //       <Menu.Item key={category.value} onClick={handleSetActive}>
  //         {category.value}
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // )

  const handlePhotoTableButtonClick = (e) => {
    console.log('what is e', e)
    dispatch(homesViewTabClicked(e.target.name))
  }

  const handleToggleSortListingsPanel = (bool: boolean) => {
    return dispatch(toggleSortListingsPanel(bool))
  }

  return (
    <SortByOptionsContainer>
      <span>40 of 232 homes</span>

      <DropdownButton
        btnKey={'listings-sort-pannel'}
        buttonName={'dynamic name'}
        activeKey={state.listings.sort.togglePanel && 'listings-sort-pannel'}
        onChange={() =>
          handleToggleSortListingsPanel(state.listings.sort.togglePanel)
        }
        component={
          <>
            <Menu>
              <AscendDescendTab />
              {SORT_BY_LISTING_CATEGORIES.map((category) => (
                <Menu.Item key={category.value} onClick={handleSetActive}>
                  {category.value}
                </Menu.Item>
              ))}
            </Menu>
          </>
        }
        buttonStyles={{
          width: '9rem',
        }}
      />

      <span className="photo-tables-buttons">
        <button name="Photo" onClick={handlePhotoTableButtonClick}>
          Photos
        </button>
        <button name="Table" onClick={handlePhotoTableButtonClick}>
          Table
        </button>
      </span>

      {/* ORIGINAL BELOW */}
      {/* <span>40 of 132 homes•</span>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={handleSetActive}>
          Sort: {activeSortCAtegory}
        </a>
      </Dropdown>

      <span className="photo-tables-buttons">
        <button name="Photo" onClick={handlePhotoTableButtonClick}>
          Photos
        </button>
        <button name="Table" onClick={handlePhotoTableButtonClick}>
          Table
        </button>
      </span> */}
    </SortByOptionsContainer>
  )
}

export default SortingRow
