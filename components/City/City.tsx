import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortActions'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
import { FilterDropdownsRow } from 'components/City/FilterDropdownsRow'
import SortingRow from './SortingRow/SortingRow'
import ListingCards from 'components/City/ListingsColumn/ListingCards'
import { ListingsTableBody } from 'components/City/ListingsColumn/ListingsTable/styles'
import SelectedHome from '@components/City/ListingsColumn/SelectedHome/SelectedHome'

const { sortListings } = ListingsSortFilterActions

const Listings: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, sortAndFilter } = state

  // useEffect(() => {
  //   if (state.sortAndFilter.isAscending !== null) {
  //     dispatch(sortListings(sortAndFilter, searchResults))
  //   }
  // }, [sortAndFilter.isAscending])

  return (
    <>
      <ListingsContainer className={'listings-container'}>
        <SortingRow />

        <SelectedHome />

        <ListingCardsAndTableCol>
          {state.listings.isTableView ? (
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
