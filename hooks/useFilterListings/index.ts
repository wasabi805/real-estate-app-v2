import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import AppContext from 'context/appContext'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
import * as ListingsFilterActions from 'actions/ListingsActions/FilterActions/bedsBathsActions'
import * as ListingsSortActions from 'actions/ListingsActions/SortActions'
import * as NewBedsBathsActions from 'actions/ListingsActions/FilterActions/newBedsBathsActions'
import { forSaleRentSoldKey } from 'utils/contants'

import {
  ifWhiteSpaces,
  forSaleSoldRentCategory,
  homeTypeCategory,
  bathsCategory,
  nAbbreviator,
} from 'utils'

import { IfilterCategories } from '../interfaces'
import { IinitialState } from 'reducers/interface'
import { IFilterListingsProps } from 'utils/interfaces/hooks'

const { setFilterByPropertyType } = ForSaleRentSoldActions
const { setSelectedHomeType } = HomeTypeActions

const { setFilterCurrentBathsAmount, clearBedsBathsFilters } =
  ListingsFilterActions
const { newSetBedsValues } = NewBedsBathsActions
const { setActiveSortCategory, setIsAscending } = ListingsSortActions

import {
  ASCEND_DECEND_LISTINGS_TAB,
  SORT_LISTINGS_ASCENDING,
  SORTING_LIST,
} from 'utils/contants'

const useFilterListings = () => {
  const { dispatch, state } = useContext(AppContext)
  const router = useRouter()

  // Updates changes in the UI and appReducer
  const dispatchAction = (action: any) => {
    dispatch(action)
  }

  const filterListings = ({ param }: IFilterListingsProps) => {
    // ----- SORT -----
    const handleAcendDescendTabClicked = () => {
      const { className } = param?.props!
      const isAscending = className === SORT_LISTINGS_ASCENDING
      dispatchAction(setIsAscending(isAscending, state))
    }

    const handleClickSortingList = () => {
      dispatchAction(setActiveSortCategory(param?.props?.criteria, state))
    }

    // ----- FILTER -----

    // dictionary of functions based in filter type to update appReducer, UI changes, and url query changes
    /* IMPORTANT, any key changes made here should also get updated in in filterBy obj at useRoute hook as well */
    const filterCategory: IfilterCategories = {
      sortTab: handleAcendDescendTabClicked,
      sortTableRow: handleClickSortingList,
      homeType: () => dispatchAction(setSelectedHomeType(param.className!)),
      status: () => dispatchAction(setFilterByPropertyType([param.className!])), //aka forSaleRentSold
      beds: () => dispatchAction(newSetBedsValues(param)),
      baths: () => {
        console.log(param.className!)
        dispatchAction(setFilterCurrentBathsAmount(param.className!))
      },

      clearData: () => {
        const { filterCategory } = param.props!

        const clearBy = {
          bedsBaths: () => dispatchAction(clearBedsBathsFilters()),
          homeType: () => dispatchAction(setSelectedHomeType('')),
          status: () =>
            dispatchAction(setFilterByPropertyType([forSaleRentSoldKey])),
        }

        return clearBy[filterCategory]()
      },
    }

    const id: string | undefined = param && param?.id

    return filterCategory[id]()
  }

  /* Wait for updates to UI, then change the route  */
  useEffect(() => {
    // handleRoute()
    handleUrlChange(state)
  }, [state])

  const handleUrlChange = (state: IinitialState) => {
    const { city, state: stateLocation } = state.searchResults
    const { forSaleRentSold, price, homeType, bedsBaths } =
      state.listings.filters
    const { isAscending, criteria } = state.listings.sort

    const url = `/city/${ifWhiteSpaces(city)}/${stateLocation}`

    // removes any from the url string when clear button is clicked
    const bedsMin =
      bedsBaths?.currentRange[0] === 'any' ? '' : bedsBaths?.currentRange[0]
    const bathsMin =
      bathsCategory(bedsBaths.currentBaths) === 'any'
        ? ''
        : bathsCategory(bedsBaths.currentBaths)
    const highLow = isAscending === true ? 'low' : 'high'

    const queryValues = {
      sort: isAscending === null ? '' : `${criteria}-${highLow}`,
      status: forSaleSoldRentCategory(forSaleRentSold.filterBy[0]),
      hometype: homeTypeCategory(homeType.selected),
      'beds-min': bedsMin,
      'beds-max':
        bedsBaths?.currentRange.length > 1 ? bedsBaths?.currentRange[1] : '',
      'baths-min': bathsMin,
      'min-price': nAbbreviator(price.minField),
      'max-price': nAbbreviator(price.maxField),
    }

    const query = Object.entries(queryValues).reduce((a, [key, value]) => {
      return value ? { ...a, [key]: value } : a
    }, {})

    const addFilter = Object.entries(query).some((val) => val)

    return router.push({
      pathname: url + (addFilter ? '/filters' : '').trim(),
      query: query,
    })
  }

  return { filterListings }
}

export default useFilterListings
