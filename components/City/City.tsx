import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
import { FilterDropdowns } from './FilterDropdowns'
import SortByOptionsMenu from './SortByOptionsMenu'
import ListingCards from 'components/City/Listings/ListingCards'
import { ListingsTableBody } from './Listings/ListingsTable/styles'
import SelectedHome from 'components/City/SelectedHome'

const { sortListings } = ListingsSortFilterActions

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
    <>
      <ListingsContainer className={'listings-container'}>
        <FilterDropdowns />
        <SortByOptionsMenu />

        <SelectedHome />

        <ListingCardsAndTableCol>
          {state.listingTable.isTableView ? (
            <ListingsTableBody />
          ) : (
            <ListingCards />
          )}
        </ListingCardsAndTableCol>
      </ListingsContainer>
    </>
  )
}

export default Listings
