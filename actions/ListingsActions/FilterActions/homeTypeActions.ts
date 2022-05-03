import { IAction } from '../../interface'
import { filterListings } from 'actions/helpers'
import { homeTypeCategory } from 'utils'

export const SET_SELECTED_HOME_TYPE = 'SET_SELECTED_HOME_TYPE'
export const setSelectedHomeType = (
  homeType: string
): Pick<IAction, 'type' | 'payload'> => {
  console.log('what is homeType', `homeType=${homeTypeCategory(homeType)}`)
  return {
    type: SET_SELECTED_HOME_TYPE,
    payload: {
      listings: {
        filters: {
          homeType: {
            selected: homeType,
          },
          currentSetFilters: [`homeType=${homeTypeCategory(homeType)}`],
        },
      },
    },
  }
}
