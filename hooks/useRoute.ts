import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import { IHandleRouteProps } from 'utils/interfaces/hooks'

const { updateFiltersUrls } = FilterActions

const useRoute = () => {
  const { dispatch } = useContext(AppContext)
  const router = useRouter()

  const handleRoute = (data: IHandleRouteProps) => {
    let route
    let urlQuery
    let updatedCurrentSetFilters: string[]

    const { city, state } = data?.state?.searchResults

    const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`

    /* SORT LISTINGS  */
    if (data.sortListings) {
      urlQuery = [`${data.sortListings.query}=${data.sortListings.slug}`]
      console.log('what is data.sortListings', data.sortListings)

      updatedCurrentSetFilters = addRemoveCurrentFilters(
        `${data.sortListings.id}`,
        urlQuery,
        data.state!.listings.filters.currentSetFilters
      )

      route = () => {
        router.push(`${path}/${updatedCurrentSetFilters.join('/')}`)
        dispatch(updateFiltersUrls(updatedCurrentSetFilters))
      }

      route()
      return
    }

    /* FILTER LISTINGS  */
    if (data.filterListings) {
      urlQuery = [`${data.filterListings.query}=${data.filterListings.slug}`]

      updatedCurrentSetFilters = addRemoveCurrentFilters(
        `${data.filterListings.id}`,
        urlQuery,
        data.state!.listings.filters.currentSetFilters
      )

      route = () => {
        router.push(`${path}/${updatedCurrentSetFilters.join('/')}`)
        dispatch(updateFiltersUrls(updatedCurrentSetFilters))
      }

      route()
      return
    }

    alert('no route')
    router.push(path)
  }

  return { handleRoute }
}

export default useRoute
