import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Menu, Tabs } from 'antd'
import { SortByOptionsContainer } from '../styles'
import * as ListingsActions from 'actions/ListingsActions'
import * as SortListingsActions from 'actions/ListingsActions/SortActions'
import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
import { IantDesignEventObj } from 'interfaces/IantDesign'
import DropdownButton from '@components/_common/DropdownButton'
import useFilterListings from '@hooks/useFilterListings'

const { TabPane } = Tabs

export const AscendDescendTab: React.FC = () => {
  const { filterListings } = useFilterListings()

  /* Tracks the active tab in reducer state */
  const handleTabClick = (key: string) => {
    filterListings({
      param: {
        id: 'sortTab',
        props: {
          className: key,
        },
      },
    })
  }

  return (
    <Tabs
      defaultActiveKey="sort-listings-ascending"
      onTabClick={handleTabClick}
    >
      <TabPane tab="A-Z" key="sort-listings-ascending" />
      <TabPane tab="Z-A" key="sort-listings-descending" />
    </Tabs>
  )
}

//----------------------------------------------------------------
const SortingRow: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { homesViewTabClicked } = ListingsActions
  const { filterListings } = useFilterListings()

  const { toggleSortListingsPanel } = SortListingsActions

  //TODO FIX THIS
  const handleSetActive = (criteria: IantDesignEventObj) => {
    filterListings({
      param: {
        id: 'sortTableRow',
        props: {
          criteria: criteria.key,
        },
      },
    })
  }

  const handlePhotoTableButtonClick = (e) => {
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
        buttonName={state.listings.sort.criteria}
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
    </SortByOptionsContainer>
  )
}

export default SortingRow
