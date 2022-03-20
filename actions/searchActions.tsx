import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'
import { IAction } from './interface'
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD'
export const setSearchField = (
  char: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_SEARCH_FIELD,
    payload: {
      value: char,
    },
  }
}

export const AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS =
  'AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS'
export const autoCompleteUpdateStateAndFetchListings = (
  addressObject: IGooglePlacesAddressObj
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS,
    payload: {
      addressObject,
    },
  }
}

export const UPDATE_STATE_WITH_SEARCH_RESULTS =
  'UPDATE_STATE_WITH_SEARCH_RESULTS'
export const updateStateWithSearchResults = (
  data
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: UPDATE_STATE_WITH_SEARCH_RESULTS,
    payload: {
      data,
    },
  }
}
