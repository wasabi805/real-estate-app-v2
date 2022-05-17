import { IReducerSlice } from 'reducers/interface'
import { sortIntergersAscending } from 'utils'

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
      //original
      // range: action.payload?.priceFilter.range,

      range:[0, 123456789],
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

    const prices = action.payload?.searchResults?.data?.props?.listings.map((h) => {
    return h.price_raw
  })
  const sortedPrices = sortIntergersAscending(prices)

  return{
    ...state,
    fetchProperty: false,

    searchResults: {
      routeTo: action.payload?.searchResults?.data.props.routeTo ,
      city: action.payload?.searchResults?.data.props.cityName,
      state: action.payload?.searchResults?.data.props.stateName,
      data: { ...action.payload?.searchResults?.data },
      initialData: { ...action.payload?.searchResults?.data },
    },

    listingTable: {
      currentHome: [
        action.payload?.searchResults?.data.props.listings.length > 0 &&
          action.payload?.searchResults?.data.props.listings[0]?.property_id,
      ], //set the first property for the Listing table view
    },

    priceFilter: {
      range: sortedPrices,
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
