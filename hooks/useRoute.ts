import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { ifWhiteSpaces } from 'utils'
import { useRouter } from 'next/router'
import { addRemoveCurrentFilters } from 'utils/helpers'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import { IHandleRouteProps } from 'utils/interfaces/hooks'
import { isArr } from 'utils/helpers'
import { bedsValue } from 'utils'

const { updateFiltersUrls } = FilterActions

const useRoute = () => {
  const { dispatch } = useContext(AppContext)
  const router = useRouter()

  const handleRoute = (data: IHandleRouteProps) => {
    // let route
    let urlQuery
    let updatedCurrentSetFilters: string[]
    const { city, state } = data?.state?.searchResults!

    const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`

    const route = () => {
      router.push(`${path}/filters/${updatedCurrentSetFilters}`)
      dispatch(updateFiltersUrls(updatedCurrentSetFilters))
    }

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
        const { slug } = data?.filterListings!
        const isAnyOrClear = slug === 'any' || slug === 'clear'

        urlQuery = [
          `${data?.filterListings?.query}=${data?.filterListings?.slug}`,
        ]

        if (isAnyOrClear) {
          urlQuery = ['']
        }
        console.log('isAnyOrClear', isAnyOrClear)
        console.log('data?.filterListings?.query', data?.filterListings?.query)
        console.log('data?.filterListings?.slug', data?.filterListings?.slug)

        updatedCurrentSetFilters = addRemoveCurrentFilters(
          `${data?.filterListings?.id}`,
          urlQuery,
          data.state!.listings.filters.currentSetFilters
        ).filter((s) => s !== '')
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
        if (isAny) {
          urlQuery = ['']

          updatedCurrentSetFilters = addRemoveCurrentFilters(
            `${data?.filterListings?.id}`,
            urlQuery,
            data.state!.listings.filters.currentSetFilters
          )
        }

        if (hasNoMax) {
          urlQuery = [`min-beds=${bedsValue(queries[0])}`]
        }

        if (!hasNoMax && !isAny) {
          urlQuery = [
            `min-beds=${bedsValue(queries[0])},max-beds=${bedsValue(
              queries[queries.length - 1]
            )}`,
          ]
        }

        updatedCurrentSetFilters = addRemoveCurrentFilters(
          `${data?.filterListings?.id}`,
          urlQuery,
          data.state!.listings.filters.currentSetFilters
        ).filter((s) => s !== '')

        //Don't remove the console.log, see above .filter()
        console.log(updatedCurrentSetFilters)
        return route()
      }

      const filterBy = {
        homeType: singleSlug,
        status: singleSlug,
        baths: singleSlug,
        beds: bedsSlugs,
        bedsBathsclear: singleSlug,
      }

      return filterBy[filterId]()
    }

    alert('no route')
    router.push(path)
  }

  return { handleRoute }
}

export default useRoute
