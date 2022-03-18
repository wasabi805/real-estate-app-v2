import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
export const SET_ACTIVE_SORT_CATEGORY = 'SET_ACTIVE_SORT_CATEGORY'

import {sortByAscendOrDescend} from './helpers'


export const setActiveSortCategory = (
  category: string,
  sortAndFilter,
  searchResults
) => {
  let rSortAndFilter
  rSortAndFilter = sortAndFilter.isAscending
  if (rSortAndFilter === null || undefined) {
    rSortAndFilter = true
  } else {
    rSortAndFilter = sortAndFilter.isAscending
  }

  const listingsToSort = [...searchResults?.data]

  const clickedTab = sortAndFilter.activeSort

  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === sortAndFilter?.activeSort
  )?.pop()?.key

  sortByAscendOrDescend(rSortAndFilter, sortKey, listingsToSort)

  return {
    type: SET_ACTIVE_SORT_CATEGORY,
    payload: {
      sortAndFilter: {
        activeSort: category,
      },

      searchResults: {
        data: sortByAscendOrDescend(rSortAndFilter, sortKey, listingsToSort),
      },
    },
  }
}

export const SET_IS_ASCENDING = 'SET_IS_ASCENDING'
export const setIsAscending = (bool: boolean) => {
  return {
    type: SET_IS_ASCENDING,
    payload: {
      sortAndFilter: {
        isAscending: bool,
      },
    },
  }
}

/** !!!!!!! FIRES WHEN THE MENU TABS ARE CLICKED */

export const SORT_LISTINGS = 'SORT_LISTINGS'
export const sortListings = (sortAndFilter, searchResults) => {
  console.log('the data to play with ', { sortAndFilter, searchResults })

  const listingsToSort = [...searchResults?.data]

  const clickedTab = sortAndFilter.activeSort

  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === sortAndFilter?.activeSort
  )?.pop()?.key

 
  switch (clickedTab) {
    case 'Price':
    case 'Beds':
    case 'Baths':
    case 'Square Feet':
      return {
        type: SORT_LISTINGS,
        payload: {
          searchResults: {
            data: sortByAscendOrDescend(
              sortAndFilter.isAscending,
              sortKey,
              listingsToSort
            ),
          },
        },
      }

    default:
      return
  }
}
