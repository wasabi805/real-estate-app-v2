import React from 'react'
import { useRouter } from 'next/router'
import { containsSubString } from 'utils'
import { isNumber } from 'lodash'

import { homeTypeCategory, forSaleSoldRentCategory, bathsCategory } from 'utils'

const useRehydrate = (url: string, state: any) => {
  const router = useRouter()
  const isCity = containsSubString(router.pathname, '/city')
  const { homeType, forSaleRentSold, price, bedsBaths } = state.listings.filters

  if (isCity) {
    console.log('what is searchResults', state.searchResults)
    const currentFilterState = {
      city: '',
      state: '',
      status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
      homeType: homeType.newSelected
        .map((s: string) => homeTypeCategory(s))
        .sort(),
      'min-price': price.minField,
      'max-price': price.maxField,
      'min-beds': isNumber(bedsBaths.currentRange[0])
        ? bedsBaths.currentRange[0]
        : '',
      'max-beds':
        bedsBaths.currentRange.length > 1
          ? bedsBaths.currentRange[bedsBaths.currentRange.length - 1]
          : '',
      'min-baths': parseFloat(bathsCategory(bedsBaths.currentBaths)),
    }
    console.log('what is currentFilterState', currentFilterState)

    const urlState = {
      city: '',
      state: '',
      status: router.query?.status,
      homeType: router.query?.homeType,
      'min-price': router.query['min-price'] && router.query['min-price'],
      'max-price': router.query['min-price'] && router.query['max-price'],
      'min-beds': router.query['min-beds'] && router.query['min-beds'],
      'max-beds': router.query['max-beds'] && router.query['max-beds'],
      'min-baths': router.query['min-baths'] && router.query['min-baths'],
    }

    // const routerDotQuery = {
    //   homeType: 'multi_family single_family condo',
    //   'max-price': '1000000',
    //   'min-baths': '2.5',
    //   'min-price': '1000',
    //   params: ['santa-barbara', 'ca', 'filters'],
    //   status: 'for-sale',
    // }

    console.log('urlState', router.query)
  }

  console.log({ url, state }, '*********')
  console.log('what is isCity', isCity)
}

export default useRehydrate
