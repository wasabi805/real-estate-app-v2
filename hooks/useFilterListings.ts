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
  const { handleRoute } = useRoute(appState)

  const filteredListings = (slug: ISlug, state) => {
    switch (slug.key) {
      case 'homeType':
        let id = `${slug.id}`

        handleRoute({
          stateSlices: {
            listings: {
              slug: slug.id,
              filters: state.listings.filters,
            },
            searchResults: {
              city: state.searchResults.city,
              state: state.searchResults.state,
            },
          },
        }) // updates the reducer with the url filters
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
