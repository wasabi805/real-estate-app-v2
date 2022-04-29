import { SORT_BY_LISTING_CATEGORIES } from 'utils/dictionaries'
import { sortByAscendOrDescend } from 'actions/helpers'
import { IinitialState } from 'reducers/interface'

export const TOGGLE_SORT_LISTINGS_PANEL = 'TOGGLE_SORT_LISTINGS_PANEL'
export const toggleSortListingsPanel = (bool: boolean) => {
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

// |------ ORIGINAL BELOW -------|
export const SET_ACTIVE_SORT_CATEGORY = 'SET_ACTIVE_SORT_CATEGORY'

interface ISortAndFilter {
  activeSort?: string
  sortedProperties?: []
  isAscending?: null | boolean
}
type test = Pick<IinitialState, 'searchResults'>

export const setActiveSortCategory = (
  criteria: string,
  state: any
  // sortAndFilter: ISortAndFilter,
  // searchResults: test

) => {
  // const { isAscending } = sortAndFilter

  console.log('before null check', state.listings.sort)
  let isAscending;
  
  if(state.listings.sort.isAscending === null || undefined){
    isAscending = true
  }
  
  const listingsToSort = [...state.searchResults.data.listings]

  // { key: 'price_raw', value: 'Price' },
  // { key: 'beds', value: 'Beds' },
  // { key: 'baths', value: 'Baths' },
  // { key: 'sqft_raw', value: 'Square Feet' },
  // { key: 'calculate_dollar_per_sq_ft', value: '$/Square Feet' },
  // { key: 'address_new', value: 'Address' },
  // { key: 'calculate_location', value: 'Location' }


  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === criteria
  )?.pop()?.key

  const updateStortedListings =sortByAscendOrDescend(
    // rSortAndFilter,
    isAscending, //this is not updating correctly
    sortKey,
    listingsToSort
  )

  console.log('what is isAscending before sent to reducer', isAscending)
  return {
    type: SET_ACTIVE_SORT_CATEGORY,
    payload: {
      // sortAndFilter: {
      //   activeSort: criteria,
      // },

      //TODO ReMOVE sortAndFilter above
      listings:{
        sort:{
          criteria: criteria,
          isAscending: state.listings.sort.isAscending
        }
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

// ORIGINAL BELOW
// export const setActiveSortCategory = (
//   category: string,
//   sortAndFilter: ISortAndFilter,
//   searchResults: test
// ) => {
//   const { isAscending } = sortAndFilter
//   let rSortAndFilter
//   isAscending === null || undefined
//     ? (rSortAndFilter = true)
//     : (rSortAndFilter = sortAndFilter.isAscending)

//   const listingsToSort = [...searchResults.data.listings]

//   const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
//     (item) => item?.value === sortAndFilter?.activeSort
//   )?.pop()?.key

//   return {
//     type: SET_ACTIVE_SORT_CATEGORY,
//     payload: {
//       sortAndFilter: {
//         activeSort: category,
//       },
//       searchResults: {
//         data: {
//           listings: sortByAscendOrDescend(
//             rSortAndFilter,
//             sortKey,
//             listingsToSort
//           ),
//         },
//       },
//     },
//   }
// }

export const SET_IS_ASCENDING = 'SET_IS_ASCENDING'
export const setIsAscending = (isAscending: boolean, state: any) => {

  const criteria = state.listings.sort.criteria
  const sortKey = SORT_BY_LISTING_CATEGORIES.filter(
    (item) => item?.value === criteria
  )?.pop()?.key
  
  const listingsToSort = [...state.searchResults.data.listings]
  const updateStortedListings =sortByAscendOrDescend(
    // rSortAndFilter,
    isAscending, //this is not updating correctly
    sortKey,
    listingsToSort
  )

  return {
    type: SET_IS_ASCENDING,
    payload: {
      listings: {
        sort:{
          criteria: criteria,
          isAscending: isAscending
        }
      },
      searchResults: {
        data: {
          listings: sortByAscendOrDescend(
            // rSortAndFilter,
            isAscending,
            sortKey,
            listingsToSort
          ),
        },
      },
    },
  }
}

/** ----- FIRES WHEN THE MENU TABS ARE CLICKED ----- */
export const SORT_LISTINGS = 'SORT_LISTINGS'
export const sortListings = (sortAndFilter, searchResults) => {
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
