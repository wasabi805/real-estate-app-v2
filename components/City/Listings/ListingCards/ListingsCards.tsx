import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import ListingCard from 'components/City/ListingCard' 
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { Ilisting } from 'actions/propertySearchBarActions/interface'
const { sortListings } = ListingsSortFilterActions

const ListingCards = ()=>{
    const appContext = useContext(AppContext)
    const { state, dispatch } = appContext
    const { searchResults, sortAndFilter } = state

    useEffect(() => {
        if (state.sortAndFilter.isAscending !== null) {
          dispatch(sortListings(sortAndFilter, searchResults))
        }
      }, [sortAndFilter.isAscending])

    return(
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.data.listings.map((house: Ilisting) => (
          <ListingCard key={house.property_id} houseData={house} />
        ))}
      </div>
    )
}

export default ListingCards