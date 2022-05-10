import React, { useContext, useState } from 'react'
import AppContext from 'context/appContext'
import { ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import { IHandleRouteProps } from 'utils/interfaces/hooks'
import { isArr } from 'utils/helpers'
import {
  bedsValue,
  homeTypeCategory,
  bathsCategory,
  forSaleSoldRentCategory,
} from 'utils'
import { url } from 'inspector'

const { updateFiltersUrls } = FilterActions

const useRoute = () => {
  const router = useRouter()
  const { state } = useContext(AppContext)
  const { city, state: stateLocation } = state.searchResults

  const url = `/city/${ifWhiteSpaces(city)}/${stateLocation}`

  const { forSaleRentSold, price, homeType, bedsBaths } = state.listings.filters
  const { sort } = state.listings

  const [routeState, setRouteState] = useState({
    status: '',
    hometype: '',
    baths: '',
  })

  const handleRoute = () => {
    setRouteState({
      status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
      hometype: homeTypeCategory(homeType.selected),
      baths: bathsCategory(bedsBaths.currentBaths),
    })
  }

  const quries = Object.entries(routeState).reduce((a, [key, value]) => {
    return value ? { ...a, [key]: value } : a
  }, {})

  return { handleRoute }
}

export default useRoute
