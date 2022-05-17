import { IReducerSlice } from 'reducers/interface'

export const setSeachField = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    fetchProperty: false,
    search: {
      ...state.search,
      value: action.payload?.value,
    },
  }
}

export const autoCompleteUpdateInputAndFetchListings = <
  T extends IReducerSlice
>({
  state,
  action,
}: T) => {
  return {
    ...state,
    search: {
      ...state.search,
      value:
        action.payload?.addressObject?.formatted_address ||
        action.payload?.addressObject?.name,
      isAutoComplete: action.payload?.addressObject?.formatted_address
        ? true
        : false,
    },
    fetchProperty: true,
  }
}

export const updateStateWithSearchResults = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    searchResults: {
      city: action.payload?.searchResults?.city,
      state: action.payload?.searchResults?.state,
      data: { ...action.payload?.searchResults?.data },
      initialData: { ...action.payload?.searchResults?.data },
    },
    fetchProperty: false,
    listingTable: {
      currentHome: [
        action.payload?.searchResults?.data.listings.length > 0 &&
          action.payload?.searchResults?.data.listings[0]?.property_id,
      ], //set the first property for the Listing table view
    },
    priceFilter: {
      range: action.payload?.priceFilter.range,
      moveMin: {
        move: false,
        value: '',
      },
      moveMax: {
        move: false,
        value: '',
      },
    },
  }
}

export const fetchSuggestionSuccess = ({state, action})=>{
  console.log('what is action in reducer',action)
  console.log('what is state in reducer', state)
  return{
    ...state
  }
}
