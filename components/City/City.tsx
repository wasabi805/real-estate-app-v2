import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTabActions from 'actions/listingTabActions.ts'
import { Col, Tabs } from 'antd'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
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

      <ListingCardsAndTableCol>
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => dispatch(homesViewTabClicked(key))}
        ></Tabs>

        {state.listingTable.isTableView ? (
          <ListingsTableBody />
        ) : (
          <ListingCards />
        )}
      </ListingCardsAndTableCol>
    </ListingsContainer>
  )
}

export default Listings
