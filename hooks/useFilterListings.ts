import React, { useState, useEffect, useReducer, useContext } from 'react'
import appReducer, { initialState } from 'reducers/appReducer'
import AppContext from 'context/appContext'
import { ifWhiteSpaces, homeTypeCategory } from 'utils'
import { arrayIncludesString } from 'utils/helpers'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
import useRoute from './useRoute'
const { setSelectedHomeType } = HomeTypeActions

const useFilterListings = (appState: any) => {
  interface ISlug {
    key: string
    id?: string
  }

  //   const [state, dispatch] = useReducer(appReducer, initialState)
  const { dispatch } = useContext(AppContext)

  const [filterData, updateFilters] = useState({
    listings: {
      slug: '',
      filters: appState.listings.filters,
    },
    searchResults: {
      city: appState.searchResults.city,
      state: appState.searchResults.state,
    },
  })

  const { handleRoute } = useRoute(appState)

  const path = `/city/${ifWhiteSpaces(
    appState.searchResults.city
  )}/${ifWhiteSpaces(appState.searchResults.state)}`

  const filteredListings = (slug: ISlug) => {
    switch (slug.key) {
      case 'homeType':
        let id = `${slug.id}`

        updateFilters({
          listings: {
            slug,
            filters: appState.listings.filters,
          },
        })

        handleRoute(filterData, id) // updates the reducer with the url filters
        dispatch(setSelectedHomeType(id)) // updates reducer with changes to the ui

        //TODO: try an make another hook to do the routing

        //1.) hook useRoute, get prevState, and slug
        //2.) if prevState doesn't include slug, add it to array
        //3.) call useRouter by passing in old state and slug param as new route
        //4.) update the reducer with newsLug and rest of slugs

        return

      case 'forSaleRentSold':
        alert('forSaleRentSold')

      default:
        return
    }
  }
  return { filteredListings }
}

export default useFilterListings
