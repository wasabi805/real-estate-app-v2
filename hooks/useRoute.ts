import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { homeTypeCategory, ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'

const { updateFiltersUrls } = FilterActions

const useRoute = (appSlices) => {
  const { dispatch } = useContext(AppContext)
  const router = useRouter()

  const handleRoute = (data) => {
    if (data.stateSlices.listings) {
      const { filters, slug } = data.stateSlices.listings
      const { city, state } = data.stateSlices.searchResults

      const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`

      const urlQuery = [`homeType=${homeTypeCategory(slug)}`]
      const updatedCurrentSetFilters = addRemoveCurrentFilters(
        'homeType',
        urlQuery,
        filters.currentSetFilters
      )

      router.push(`${path}/${updatedCurrentSetFilters.join('/')}`)
      dispatch(updateFiltersUrls(updatedCurrentSetFilters))
    }
  }

  return { handleRoute }
}

export default useRoute
