import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'

export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD'
export const setSearchField = (char: string) => {
  return {
    type: SET_SEARCH_FIELD,
    payload: {
      value: char,
    },
  }
}

export const AUTO_COMPLETE_UPDATE_INPUT = 'AUTO_COMPLETE_UPDATE_INPUT'
export const autoCompleteUpdateState = (
  addressObject: IGooglePlacesAddressObj
) => {
  return {
    type: AUTO_COMPLETE_UPDATE_INPUT,
    payload: {
      addressObject,
    },
  }
}
