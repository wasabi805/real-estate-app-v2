import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import AppContext from 'context/appContext'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
import * as ListingsFilterActions from 'actions/ListingsActions/FilterActions/bedsBathsActions'
import * as ListingsSortActions from 'actions/ListingsActions/SortActions'
import * as NewBedsBathsActions from 'actions/ListingsActions/FilterActions/newBedsBathsActions'
import { forSaleRentSoldKey } from 'utils/contants'
import { useHistory } from '@hooks/useHistory'
import { buildUrlFilterString } from '@hooks/helpers'

import {
  joinStringWith,
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
      baths: () =>
        dispatchAction(setFilterCurrentBathsAmount(param.className!)),
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

  /* fires from useEffect in the Listings component */
  const handleUrlChange = (state: IinitialState) => {
    const { pathname, query } = buildUrlFilterString(state)

    return router.push({
      pathname,
      query,
    })
  }
  return { filterListings, handleUrlChange }
}

export default useFilterListings
