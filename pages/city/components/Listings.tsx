import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
import SortingRow from './SortingRow/SortingRow'
import ListingCards from '@pages/city/components/ListingsColumn/ListingCards'
import { ListingsTableBody } from '@pages/city/components/ListingsColumn/ListingsTable/styles'
import SelectedHome from '@pages/city/components/ListingsColumn/SelectedHome/SelectedHome'

const Listings: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)
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
