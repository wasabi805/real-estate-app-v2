import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortActions'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
import { FilterDropdownsRow } from 'components/City/FilterDropdownsRow'
import SortingRow from './SortingRow/SortingRow'
import ListingCards from 'components/City/ListingsColumn/ListingCards'
import { ListingsTableBody } from 'components/City/ListingsColumn/ListingsTable/styles'
import SelectedHome from '@components/City/ListingsColumn/SelectedHome/SelectedHome'

const Listings: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext

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
