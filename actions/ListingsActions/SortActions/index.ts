import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
import { sortByAscendOrDescend } from 'actions/helpers'
import { IinitialState } from 'reducers/interface'
import { IAction } from 'actions/interface'

export const TOGGLE_SORT_LISTINGS_PANEL = 'TOGGLE_SORT_LISTINGS_PANEL'
export const toggleSortListingsPanel = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: TOGGLE_SORT_LISTINGS_PANEL,
    payload: {
      listings: {
        sort: {
          togglePanel: bool,
        },
      },
    },
  }
}

export const SET_ACTIVE_SORT_CATEGORY = 'SET_ACTIVE_SORT_CATEGORY'

interface ISortAndFilter {
  activeSort?: string
  sortedProperties?: []
  isAscending?: null | boolean
}
type test = Pick<IinitialState, 'searchResults'>

export const setActiveSortCategory = (
  slug: string,
  state: any
): Pick<IAction, 'type' | 'payload'> => {
  let isAscending

  if (state.listings.sort.isAscending === null || undefined) {
    isAscending = true
  }

  const listingsToSort = [...state.searchResults.data.listings]

  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === slug
  )?.pop()?.key

  return {
    type: SET_ACTIVE_SORT_CATEGORY,
    payload: {
      listings: {
        sort: {
          togglePanel: false,
          criteria: slug,
          isAscending: state.listings.sort.isAscending,
        },
      },

      searchResults: {
        data: {
          listings: sortByAscendOrDescend(
            state.listings.sort.isAscending,
            sortKey,
            listingsToSort
          ),
        },
      },
    },
  }
}

export const SET_IS_ASCENDING = 'SET_IS_ASCENDING'
export const setIsAscending = (
  isAscending: boolean,
  state: any
): Pick<IAction, 'type' | 'payload'> => {
  const criteria = state.listings.sort.criteria
  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === criteria
  )?.pop()?.key

  const listingsToSort = [...state.searchResults.data.listings]

  return {
    type: SET_IS_ASCENDING,
    payload: {
      listings: {
        sort: {
          criteria: criteria,
          isAscending: isAscending,
        },
      },
      searchResults: {
        data: {
          listings: sortByAscendOrDescend(isAscending, sortKey, listingsToSort),
        },
      },
    },
  }
}

/** ----- FIRES WHEN THE MENU TABS ARE CLICKED ----- */
export const SORT_LISTINGS = 'SORT_LISTINGS'
export const sortListings = (
  sortAndFilter,
  searchResults
): Pick<IAction, 'type' | 'payload'> => {
  const listingsToSort = [...searchResults?.data?.listings]

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
            data: {
              listings: sortByAscendOrDescend(
                sortAndFilter.isAscending,
                sortKey,
                listingsToSort
              ),
            },
          },
        },
      }

    default:
      return
  }
}
