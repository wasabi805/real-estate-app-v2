import { IAction } from 'actions/interface'

export const SET_FILTER_DRAWER_OPEN = 'SET_FILTER_DRAWER_OPEN'
export const setFilterDrawerOpen = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_FILTER_DRAWER_OPEN,
  payload: {
    listings: {
      filters: {
        allFilters: {
          isDrawerOpen: bool,
        },
      },
    },
  },
})
