import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTabActions from 'actions/listingTabActions.ts'
import { Col, Tabs } from 'antd'
import { ListingsContainer } from './styles'
import SortByOptionsMenu from './SortByOptionsMenu'
import ListingCards from 'components/City/Listings/ListingCards'
import ListingsTable from '@components/City/Listings/ListingsTable/ListingsTable'
import { ListingsTableBody } from './Listings/ListingsTable/styles'
import SelectedHome from 'components/City/SelectedHome'
const { sortListings } = ListingsSortFilterActions
const { homesViewTabClicked } = ListingTabActions

const { TabPane } = Tabs

const Listings: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, sortAndFilter } = state

  useEffect(() => {
    if (state.sortAndFilter.isAscending !== null) {
      dispatch(sortListings(sortAndFilter, searchResults))
    }
  }, [sortAndFilter.isAscending])

  return (
    <ListingsContainer className={'listings-container'}>
      <SortByOptionsMenu />

      <SelectedHome />

      <Col span={24} className="listings-card-col">
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => dispatch(homesViewTabClicked(key))}
        >
          {/* LISTINGS PRESENTED WITH CARDS VIEW */}
          {/* <TabPane tab="Photos" key="Photos">
            <ListingCards />
          </TabPane> */}

          {/* LISTINGS PRESENTED WITH TABLE VIEW */}
          {/* <TabPane tab="Table" key="Table">
            <ListingsTable />
          </TabPane> */}
        </Tabs>

        {state.listingTable.isTableView ? 
        <ListingsTableBody /> : <ListingCards />}
      </Col>
    </ListingsContainer>
  )
}

export default Listings
