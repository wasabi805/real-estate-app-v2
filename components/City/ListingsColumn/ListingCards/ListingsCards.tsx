import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import Card from '@components/City/ListingsColumn/ListingCards/Card'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortActions'
import { Ilisting } from 'actions/propertySearchBarActions/interface'
import { ListingsCardWrapper } from 'components/City/ListingsColumn/ListingCards/styles'
const { sortListings } = ListingsSortFilterActions

const ListingCards = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, sortAndFilter } = state

  // useEffect(() => {
  //   if (state.sortAndFilter.isAscending !== null) {
  //     dispatch(sortListings(sortAndFilter, searchResults))
  //   }
  // }, [sortAndFilter.isAscending])

  return (
    <ListingsCardWrapper>
      {searchResults.data.listings.map((house: Ilisting) => (
        <Card
          key={house.property_id}
          className={'listing-card'}
          houseData={house}
        />
      ))}
    </ListingsCardWrapper>
  )
}

export default ListingCards
