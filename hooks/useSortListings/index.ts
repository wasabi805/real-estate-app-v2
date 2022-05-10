import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import useRoute from '../useRoute'

import * as ListingsSortActions from 'actions/ListingsActions/SortActions'

const { setActiveSortCategory, setIsAscending } = ListingsSortActions
import {
  ASCEND_DECEND_LISTINGS_TAB,
  SORT_LISTINGS_ASCENDING,
  SORT_LISTINGS_DESCENDING,
  SORTING_LIST,
} from 'utils/contants'

const useSortListings = () => {
  const { dispatch, state } = useContext(AppContext)
  const { handleRoute } = useRoute()

  // Updates changes in the UI and appReducer
  const dispatchAction = (action: any) => {
    dispatch(action)
  }

  const sortListings = ({ param }) => {
    console.log('what is param', param)
    const { id } = param

    const handleAcendDescendTabClicked = () => {
      const { className } = param?.props!
      const isAscending = className === SORT_LISTINGS_ASCENDING
      dispatchAction(setIsAscending(isAscending, state))
    }

    const handleClickSortingList = () => {
      console.log('what is state', state)
      const { isAscending } = state.listings.sort
      // const isAscendingValue = isAscending === null ? true : isAscending
      // console.log('isAscendingValue', isAscendingValue)
      dispatchAction(
        setActiveSortCategory(
          param.props.criteria,
          state
          // isAscendingValue
        )
      )
    }

    const sortCategory = {
      [ASCEND_DECEND_LISTINGS_TAB]: handleAcendDescendTabClicked,
      [SORTING_LIST]: handleClickSortingList,
    }

    return sortCategory[id]()
  }
  return { sortListings }
}

export default useSortListings
