import { IAction } from '../../interface'
import { IinitialState } from 'reducers/interface'

export const SET_SELECTED_HOME_TYPE = 'SET_SELECTED_HOME_TYPE'
export const setSelectedHomeType = (
  homeType: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  let newSelected = [...state.listings.filters.homeType.newSelected]

  const arrContainsStr = (str: string, array: string[]) => {
    const containsStr = array.filter((s: string) => s === str)
    return containsStr.indexOf(str) === 0
  }

  arrContainsStr(homeType, newSelected)
    ? (newSelected = newSelected.filter((s) => s !== homeType))
    : newSelected.push(homeType)

  return {
    type: SET_SELECTED_HOME_TYPE,
    payload: {
      listings: {
        filters: {
          homeType: {
            selected: homeType,
            newSelected: newSelected,
          },
        },
      },
    },
  }
}
