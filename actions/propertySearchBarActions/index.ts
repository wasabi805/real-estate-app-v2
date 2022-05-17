import { IGooglePlacesAddressObj } from 'actions/propertySearchBarActions/IPropertySearchBar'
import { IAction } from '../interface'
import { defineFilterPriceSliderData } from 'actions/ListingsActions/FilterActions/helpers'
import { sortIntergersAscending, sortByAscendOrDescend } from 'utils'
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
export const updateStateWithSearchResults = ({
  data,
  city,
  state,
}): Pick<IAction, 'type' | 'payload'> => {
  const prices = data.listings.map((h) => {
    return h.price_raw
  })
  const sortedPrices = sortIntergersAscending(prices)

  return {
    type: UPDATE_STATE_WITH_SEARCH_RESULTS,
    payload: {
      searchResults: {
        data,
        city,
        state,
      },
      priceFilter: {
        range: sortedPrices,
      },
    },
  }
}

//TODO MAKE THE INTERFACE FOR THIS
export const FETCH_SUGGESTION_SUCCESS = 'FETCH_SUGGESTION_SUCCESS'
export const fetchSugestionSuccess = (data) => {
  console.log('what is data in action', data)

  // const{ cityName, listings, stateName, zipCode, routeTo, meta } = data.props
  // const prices = data.props?.listings.map((h) => {
  //   return h.price_raw
  // })
  // const sortedPrices = sortIntergersAscending(prices)


  return {
    type: FETCH_SUGGESTION_SUCCESS,
    payload: {
      searchResults: data
    }
  }
}
