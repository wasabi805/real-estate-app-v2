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
    let urlQuery: string[] = [];
    let updatedCurrentSetFilters: string[]

    const { city, state } = data?.state?.searchResults!

    const path = `/city/${ifWhiteSpaces(city)}/${ifWhiteSpaces(state)}`
  
    const route = () => {
      router.push(`${path}/filters/${updatedCurrentSetFilters}`)
      dispatch(updateFiltersUrls(updatedCurrentSetFilters))
    }

    /* SORT LISTINGS  */
    if (data.sortListings) {
      urlQuery.push(`${data.sortListings.query}=${data.sortListings.slug}`)

      updatedCurrentSetFilters = addRemoveCurrentFilters(
        `${data.sortListings.id}`,
        urlQuery,
        data.state!.listings.filters.currentSetFilters
      )
      return route()
    }

    console.log('WHAT IS DATA IN useRoute', data)

    /* FILTER LISTINGS  */
    if (data?.filterListings!) {
      const filterId = data?.filterListings?.id!

      // https://www.redfin.com/city/3104/AZ/Chandler/apartments-for-rent/filter/sort=lo-beds,property-type=condo,min-price=750,min-beds=3,min-baths=2
      const order =[{
        id: 'status', //forSaleRentSold
        value: ''
      },
      //start filter
      {
        id: 'sort',
        value: ''
      },
      {
        id: 'homeType',
        value: ''
      },
      {
        id: 'price',
        value: ''
      },
      {
        id: 'bedsBaths',
        value: ''
      }
    ]

      const handleClearData = () => {
        const { filterCategory, query } = data?.filterListings?.props!

        const clearFilterBy = {
          bedsBaths: () => {
            //WHATS IN THE CURRENT FILTERS?
            console.log(
              'WHATS IN THE CURRENT FILTERS?',
              data.state?.listings.filters.currentSetFilters
            )
            const { currentSetFilters } = data.state?.listings.filters! //1 pass arg

            // REMOVE anything with
            const bedsBathQueries = new RegExp('min-beds|max-beds|min-baths') //2pass regEx
            const rest = currentSetFilters.filter(
              (s) => !bedsBathQueries.test(s)
            ) //to update the reducer

            const currentPath: string = router.asPath

            //split the path,
            const pathParts: string[] = currentPath.split('/')

            //now find the string of queries...  // let filterStringUrl: string[] = pathParts.filter( s=> bedsBathQueries.test(s))
            let filterStringUrl: string = pathParts.reduce(
              (a, urlPart) => bedsBathQueries.test(urlPart) && urlPart,
              ''
            )

            //if this fails return the currentPath
            if (typeof filterStringUrl === 'string') {
              //ex.) filterStringUrl= min-beds=2,max-beds=3,min-baths=1.5,homeType=multiFamily,status=for-rent
              let filterStringParts = filterStringUrl.split(',')

              const updatedUrlQueryString =
                '/filters/' +
                filterStringParts.reduce((prev, cur) => {
                  return bedsBathQueries.test(cur) === false
                    ? prev + cur + '/'
                    : prev + ''
                }, '')

              const updatedUrl = pathParts
                .map((item) => {
                  if (
                    bedsBathQueries.test(item) === true ||
                    item === 'filters' ||
                    item === 'city'
                  ) {
                    return ''
                  }
                  return item
                })
                .filter((p) => p !== '')

              console.log('updatedUrl', updatedUrl) // ['city', 'santa monica', 'ca]
              console.log('updatedUrlQueryString', updatedUrlQueryString) // url with removed part

              const newUrl = [...updatedUrl]
                .join('/')
                .concat(updatedUrlQueryString)
              console.log('what is newUrl', newUrl)
              router.push(newUrl)
            }

            console.log('is this the right filterStringUrl', filterStringUrl)
            //ex.) filterStringUrl = ['homeType=multiFamily,status=for-rent,min-beds=2,max-beds=3,min-baths=2']
          },
        }

        return clearFilterBy[filterCategory]()
      }

      const singleSlug = () => {
        console.log(data, 'what is data ' , '------', data?.filterListings?.id, '------')
        const { slug } = data?.filterListings!
        const isAnyOrClear = slug === 'any' || slug === 'clear'

        urlQuery.push(`${data?.filterListings?.query}=${data?.filterListings?.slug}`)

        if (isAnyOrClear) {
          urlQuery.push('')
        }

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
          urlQuery.push(`min-beds=${bedsValue(queries[0])}`)
        }

        if (!hasNoMax && !isAny) {
          urlQuery.push( `min-beds=${bedsValue(queries[0])},max-beds=${bedsValue(
            queries[queries.length - 1]
          )}`)
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
        clearData: handleClearData,
      }

      return filterBy[filterId]()
    }

    alert('no route')
    router.push(path)
  }

  return { handleRoute }
}

export default useRoute
