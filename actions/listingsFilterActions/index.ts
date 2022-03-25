import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
export const SET_FILTER_DRAWER_OPEN = 'SET_FILTER_DRAWER_OPEN'
export const setFilterDrawerOpen = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_FILTER_DRAWER_OPEN,
  payload: {
    listingsFilters: {
      isDrawerOpen: bool,
    },
  },
})

export const HANDLE_CLICK_BEDS_FILTER_BUTTON = 'HANDLE_CLICK_BEDS_FILTER_BUTTON'
export const handleClickBedsFilterButton = (
  name: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  console.log('what is allBedsButtons', { name, state })
  return {
    type: HANDLE_CLICK_BEDS_FILTER_BUTTON,
    payload: {
      listingsFilters: {
        bedsButtons: [],
      },
    },
  }
}

export const HANDLE_CLICK_BATHS_FILTER_BUTTON =
  'HANDLE_CLICK_BATHS_FILTER_BUTTON'
export const handleClickBathsFilterButton = (
  name: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: HANDLE_CLICK_BATHS_FILTER_BUTTON,
    payload: {
      listingsFilters: {
        bathsButtons: [],
      },
    },
  }
}
