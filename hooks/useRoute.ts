import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import { IHandleRouteProps } from 'utils/interfaces/hooks'
import { isArr } from 'utils/helpers'

const { updateFiltersUrls } = FilterActions

const useRoute = () => {
  const { dispatch } = useContext(AppContext)
  const router = useRouter()

  const handleRoute = (data: IHandleRouteProps) => {
    // let route
    let urlQuery
    let updatedCurrentSetFilters: string[]

    const route = () => {
      router.push(
        `${path}/filters/${updatedCurrentSetFilters.join(',').trim()}`
      )
      dispatch(updateFiltersUrls(updatedCurrentSetFilters))
    }

    const { city, state } = data?.state?.searchResults

    const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`

    /* SORT LISTINGS  */
    if (data.sortListings) {
      urlQuery = [`${data.sortListings.query}=${data.sortListings.slug}`]

      updatedCurrentSetFilters = addRemoveCurrentFilters(
        `${data.sortListings.id}`,
        urlQuery,
        data.state!.listings.filters.currentSetFilters
      )
      return route()
    }

    /* FILTER LISTINGS  */
    if (data?.filterListings!) {
      const filterId = data?.filterListings?.id!

      const singleSlug = () => {
        urlQuery = [
          `${data?.filterListings?.query}=${data?.filterListings?.slug}`,
        ]
        updatedCurrentSetFilters = addRemoveCurrentFilters(
          `${data?.filterListings?.id}`,
          urlQuery,
          data.state!.listings.filters.currentSetFilters
        )
        console.log(updatedCurrentSetFilters)
        return route()
      }

      const bedsSlugs = () => {
        const queries =
          isArr(data?.filterListings?.slug) &&
          data?.filterListings?.slug?.map((q) => {
            return `${q.query}=${q.value}`
          })

        //TODO : if isAny, clear route
        const isAny: boolean = queries.some((q: string) => q.includes('any'))

        //TODO : if false, include a max in the query slug
        const hasNoMax = queries.some((q: string) => q.includes('5'))

        console.log('isAny', isAny)
        console.log('hasNoMax', hasNoMax)

        // urlQuery = [bedsAmount]
        // updatedCurrentSetFilters = addRemoveCurrentFilters(
        //   `${data?.filterListings?.id}`,
        //   urlQuery,
        //   data.state!.listings.filters.currentSetFilters
        // )

        // return route()

        // console.log(urlQuery,'urlQuery')
      }

      const filterBy = {
        homeType: singleSlug,
        status: singleSlug,
        baths: singleSlug,
        beds: bedsSlugs,
      }

      return filterBy[filterId]()
    }

    alert('no route')
    router.push(path)
  }

  return { handleRoute }
}

export default useRoute
