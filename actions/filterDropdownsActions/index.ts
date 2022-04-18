import { IAction } from 'actions/interface'

export const SET_ACTIVE_FILTER_PANEL = 'SET_ACTIVE_FILTER_PANEL'
export const setActiveFilterPanel = (
  activePanelKey: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_ACTIVE_FILTER_PANEL,
    payload: {
      filterDropdownsRow: {
        activeFilterPanel: activePanelKey,
      },
    },
  }
}

export const SET_SELECTED_HOME_TYPE = 'SET_SELECTED_HOME_TYPE'
export const setSelectedHomeType = (
  homeType: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_SELECTED_HOME_TYPE,
    payload: {
      homeType: {
        selected: homeType,
      },
    },
  }
}
