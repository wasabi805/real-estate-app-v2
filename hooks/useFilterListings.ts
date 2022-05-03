import React, { useState, useEffect, useReducer } from 'react'
import appReducer, { initialState } from 'reducers/appReducer'
import { useRouter } from 'next/router'
import AppContext from 'context/appContext'
import { ifWhiteSpaces, homeTypeCategory } from 'utils'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
const { setSelectedHomeType } = HomeTypeActions

const useFilterListings = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [currentSetFilters, updateFilteredListings] = useState(
    state.listings.filters.currentSetFilters
  )

  useEffect(() => {
    updateFilteredListings(state.listings.filters.currentSetFilters)
  }, [state.listings.filters.currentSetFilters])

  const router = useRouter()
  const path = `/city/${ifWhiteSpaces(
    state.searchResults.city
  )}/${ifWhiteSpaces(state.searchResults.state)}`

  interface ISlug {
    key: string
    id?: string
  }

  const filteredListings = (slug: ISlug) => {
    //TODO: match the key

    switch (slug.key) {
      case 'homeType':
        let id = `${slug.id}`
        let buildingType = homeTypeCategory(id)

        dispatch(setSelectedHomeType(id))
        router.push(`${path}/homeType=${buildingType}`)
        return

      case 'forSaleRentSold':
        alert('forSaleRentSold')

      default:
        return
    }
  }

  console.log('what is listings now', currentSetFilters)

  return { currentSetFilters, filteredListings }
}

export default useFilterListings
