import { IAction } from 'actions/interface'
export const ON_FETCH_SUCCESS = 'ON_FETCH_SUCCESS'
export const onFetchSuccess = (
  path: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: ON_FETCH_SUCCESS,
  }
}

export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const setIsFetching = (boolean: boolean) => {
  return {
    type: SET_IS_FETCHING,
    payload: {
      fetchProperty: boolean,
    },
  }
}
