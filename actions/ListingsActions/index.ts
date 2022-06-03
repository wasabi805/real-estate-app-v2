import { IAction } from 'actions/interface'

export const HOMES_VIEW_TAB_CLICKED = 'HOMES_VIEW_TAB_CLICKED'
export const homesViewTabClicked = (
  string: string
): Pick<IAction, 'type' | 'payload'> => {
  const isTableView = string === 'Table'

  return {
    type: HOMES_VIEW_TAB_CLICKED,

    payload: {
      listings: {
        isTableView,
      },
    },
  }
}

export const SET_CLICKED_ROW = 'SET_CLICKED_ROW'
export const setClickedRow = (
  property_id: string[]
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_CLICKED_ROW,
    payload: {
      listings: {
        currentHome: property_id,
      },
    },
  }
}

export const UPDATE_LISTINGS = 'UPDATE_LISTINGS'
export const updateListings = (data) => {
  return {
    type: UPDATE_LISTINGS,
    payload: {},
  }
}
