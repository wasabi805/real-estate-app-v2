import { IAction } from 'actions/interface'
import { allFiltersPayloadPath } from 'utils/contants'
import { updateNestedObj } from 'utils/helpers'

const allFiltersPayload = {
  listings: { filters: { allFilters: {} } },
}

export const SET_FILTER_DRAWER_OPEN = 'SET_FILTER_DRAWER_OPEN'
export const setFilterDrawerOpen = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_FILTER_DRAWER_OPEN,
  payload: updateNestedObj(allFiltersPayloadPath)({
    isDrawerOpen: bool,
  })(allFiltersPayload),
})
