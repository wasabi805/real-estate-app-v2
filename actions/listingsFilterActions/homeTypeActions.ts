import { IAction } from '../interface'

export const SET_SELECTED_HOME_TYPE = 'SET_SELECTED_HOME_TYPE'
export const setSelectedHomeType = (
  homeType: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_SELECTED_HOME_TYPE,
    payload: {
      listings: {
        filters:{
          homeType: {
            selected: homeType,
          },
        }
      },
    },
  }
}
