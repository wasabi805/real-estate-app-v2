export const SET_ACTIVE_SORT_CATEGORY = 'SET_ACTIVE_SORT_CATEGORY'
export const setActiveSortCategory = (category: string) => {
  return {
    type: SET_ACTIVE_SORT_CATEGORY,
    payload: {
      sortAndFilter: {
        activeSort: category,
      },
    },
  }
}

export const UPDATE_LISTINGS_BY_ASC_OR_DESC = 'UPDATE_LISTINGS_BY_ASC_OR_DESC'

export const updateListingsByAscOrDesc = (
  isAsc: boolean,
  category: string,
  data: any
) => {
  const sortByQuantity = (isAsc: Boolean, key: string, data: any) =>
    data.sort((a: string, b: string) =>
      isAsc ? a[key] - b[key] : b[key] - a[key]
    )
  // sqft_raw
  switch (category) {
    case 'Price':
      return {
        type: UPDATE_LISTINGS_BY_ASC_OR_DESC,
        payload: {
          data: sortByQuantity(isAsc, 'price_raw', data),
        },
      }

    case 'Beds':
    return {
      type: UPDATE_LISTINGS_BY_ASC_OR_DESC,
      payload: {
        data: sortByQuantity(isAsc, 'beds', data),
      },
    }

    case 'Square Feet':
      return {
        type: UPDATE_LISTINGS_BY_ASC_OR_DESC,
        payload: {
          data: sortByQuantity(isAsc, 'sqft_raw', data),
        },
      }

    default:
      return
  }
}
