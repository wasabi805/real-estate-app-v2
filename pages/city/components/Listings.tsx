import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import { ListingsContainer, ListingCardsAndTableCol } from './styles'
import SortingRow from './SortingRow/SortingRow'
import ListingCards from '@pages/city/components/ListingsColumn/ListingCards'
import { ListingsTableBody } from '@pages/city/components/ListingsColumn/ListingsTable/styles'
import SelectedHome from '@pages/city/components/ListingsColumn/SelectedHome/SelectedHome'
import useFilterListings from 'hooks/useFilterListings'

const Listings: React.FC = () => {
  const appContext = useContext(AppContext)
  const { state } = appContext
  const { forSaleRentSold, price, homeType, bedsBaths } = state.listings.filters
  const { handleUrlChange } = useFilterListings()

  /* Change the URL if any of the filter buttons are clicked */
  useEffect(() => {
    handleUrlChange(state)
  }, [forSaleRentSold, price, homeType, bedsBaths])

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
