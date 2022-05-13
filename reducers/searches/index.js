import { IReducerSlice } from 'reducers/interface'
export const setIsFetching = (state, action) => {
  console.log(action)

  return {
    ...state,
  }
}
