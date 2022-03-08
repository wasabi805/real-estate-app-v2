export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD'

export const setSearchField = (char: string) => {
  return {
    type: SET_SEARCH_FIELD,
    payload: {
      value: char,
    },
  }
}
