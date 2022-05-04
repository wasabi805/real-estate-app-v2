import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { homeTypeCategory, forSaleSoldRentCategory, ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'

const { updateFiltersUrls } = FilterActions

const useRoute = () => {
  const { dispatch } = useContext(AppContext)
  const router = useRouter()

  const handleRoute = (data) => {
    const { city, state } = data.stateSlices.searchResults
    let urlQuery
    let updatedCurrentSetFilters
    const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`

    const route = () => {
      router.push(`${path}/${updatedCurrentSetFilters.join('/')}`)
      dispatch(updateFiltersUrls(updatedCurrentSetFilters))
    }

    /* ----- forSaleRentSold ----- */
    if (data.stateSlices.forSaleRentSold) {
      const { filters, slug } = data.stateSlices.forSaleRentSold
      urlQuery = [`forSaleRentSold=${forSaleSoldRentCategory(slug)}`]

      updatedCurrentSetFilters = addRemoveCurrentFilters(
        'forSaleRentSold',
        urlQuery,
        filters.currentSetFilters
      )
      route()
    }

    /* ----- homeType ----- */
    if (data.stateSlices.listings) {
      const { filters, slug } = data.stateSlices.listings

      urlQuery = [`homeType=${homeTypeCategory(slug)}`]
      updatedCurrentSetFilters = addRemoveCurrentFilters(
        'homeType',
        urlQuery,
        filters.currentSetFilters
      )
      route()
    }
  }

  return { handleRoute }
}

export default useRoute
