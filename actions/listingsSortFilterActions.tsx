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

export const SORT_LISTINGS_ASCENDING = 'SORT_LISTINGS_ASCENDING'
export const sortListingsAscending = (category: string, data) => {
  return {
    type: SORT_LISTINGS_ASCENDING,
  }
}

export const SORT_LISTINGS_DESCENDING = 'SORT_LISTINGS_DESCENDING'
export const sortListingsDescending = (
  isAsc: boolean,
  category: string,
  data
) => {
  // var res = myarray.sort((a, b) => b.age-a.age);
  console.log(isAsc)
  return {
    type: SORT_LISTINGS_DESCENDING,
  }
}
