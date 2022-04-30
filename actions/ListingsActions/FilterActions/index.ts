import { IAction } from 'actions/interface'

export const SET_ACTIVE_FILTER_PANEL = 'SET_ACTIVE_FILTER_PANEL'
export const setActiveFilterPanel = (
  activePanelKey: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_ACTIVE_FILTER_PANEL,
    payload: {
      listings: {
        filters: {
          activeFilterPanel: activePanelKey,
        },
      },
    },
  }
}

export const UPDATE_FILTER_RESPONSE = 'UPDATE_FILTER_RESPONSE'
export const updateFilterResponse =(data)=>{
  console.log('what is data', data)
  return{
    type: UPDATE_FILTER_RESPONSE,
    payload:''
  }
}
