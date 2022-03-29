import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as ListingTabActions from 'actions/listingTabActions.ts'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTableActions from 'actions/listingsTableActions'
import { mockListings } from 'mockListings'
import {
  LISTINGS_FILTERS_BUTTONS_BEDS,
  LISTINGS_FILTERS_BUTTONS_BATHS,
} from 'utils/dictionaries'
import { IinitialState } from 'reducers/interface'
import { IAction } from 'actions/interface'

const {
  RENDER_LOGIN_MODLE,
  DISMISS_LOGIN_MODLE,
  SET_IS_LOGIN,
  SET_LOGIN_FORM_CHANGE,
} = LoginModalActions

const {
  SET_SEARCH_FIELD,
  AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS,
  UPDATE_STATE_WITH_SEARCH_RESULTS,
} = SearchActions

const {
  SET_FILTER_DRAWER_OPEN,
  HANDLE_CLICK_BEDS_FILTER_BUTTON,
  HANDLE_CLICK_BATHS_FILTER_BUTTON,
  SET_MIN_PRICE_FILTER_FIELD,
  SET_MAX_PRICE_FILTER_FIELD,
  ACTIVATE_PRICE_FILTER_SLIDER,
  SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN

} = ListingsFilterActions

const { SORT_LISTINGS, SET_IS_ASCENDING, SET_ACTIVE_SORT_CATEGORY } =
  ListingsSortFilterActions

const { SET_CLICKED_ROW } = ListingTableActions
const { HOMES_VIEW_TAB_CLICKED } = ListingTabActions

export const initialState: IinitialState = {
  isLoginModalVisibile: false,
  user: {
    password: '',
    email: '',
  },
  search: {
    value: '',
    isAutoComplete: false,
  },
  fetchProperty: false,
  searchResults: {
    data: {
      listings: [],
      // listings: mockListings,
    },
    initialData: [],
    // initialData: mockListings,
  },

  priceFilter: {
    //inputs
    minField: null,
    maxField: null,

    //slider
    range: [],
    moveMin:{
      move: false,
      value: ''
    },
    moveMax:{
      move: false,
      value: ''
    }
  },

  listingsFilters: {
    isDrawerOpen: false,
    clickedFilterName: null,
    currentRange: [],
    bedsButtons: LISTINGS_FILTERS_BUTTONS_BEDS || [],
    bathsButtons: LISTINGS_FILTERS_BUTTONS_BATHS || [],
  },

  sortAndFilter: {
    activeSort: 'Price',
    sortedProperties: [],
    isAscending: null,
  },

  listingTable: {
    isTableView: false,
    // currentHome: [''],
    currentHome: ['2892620475'],
  },

  loginModal: {
    isLogin: true,
    email: '',
    confirmEmail: '',
    password: '',
  },
}
const appReducer = (state: IinitialState, action: IAction) => {
  switch (action.type) {
    //  LOGIN MODAL
    case RENDER_LOGIN_MODLE:
      return {
        ...state,
        isLoginModalVisibile: action.payload?.renderLoginModal,
      }

    case DISMISS_LOGIN_MODLE:
      return {
        ...state,
        isLoginModalVisibile: action.payload?.dismissLoginModal,
      }

    case SET_IS_LOGIN:
      return {
        ...state,
        loginModal: {
          email: state.loginModal.email,
          isLogin: action.payload?.isLogin,
        },
      }

    case SET_LOGIN_FORM_CHANGE:
      return {
        ...state,
        loginModal: action.payload?.userLoginData,
      }

    case SET_SEARCH_FIELD:
      return {
        ...state,
        fetchProperty: false,
        search: {
          ...state.search,
          value: action.payload?.value,
        },
      }

    case AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS:
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
    case UPDATE_STATE_WITH_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: {
          data: { ...action.payload?.searchResults?.data },
          initialData: { ...action.payload?.searchResults?.data },
        },
        fetchProperty: false,
        listingTable: {
          currentHome: [
            action.payload?.searchResults?.data.listings[0].property_id,
          ], //set the first property for the Listing table view
        },
        priceFilter: {
          range: action.payload?.priceFilter.range,
          moveMin:{
            move: false,
            value: ''
          },
          moveMax:{
            move: false,
            value: ''
          }
        },
      }

    case HOMES_VIEW_TAB_CLICKED:
      return {
        ...state,
        listingTable: {
          ...state.listingTable,
          isTableView: action.payload?.listingTable?.isTableView,
        },
      }

    case SET_FILTER_DRAWER_OPEN:
      return {
        ...state,
        listingsFilters: {
          ...state.listingsFilters,
          isDrawerOpen: action.payload?.listingsFilters?.isDrawerOpen,
        },
      }

    case HANDLE_CLICK_BEDS_FILTER_BUTTON:
      return {
        ...state,
        listingsFilters: action.payload?.listingsFilters,
      }
    case HANDLE_CLICK_BATHS_FILTER_BUTTON:
      return {
        ...state,
      }

    case SET_MIN_PRICE_FILTER_FIELD:
      console.log('verify reducer changes' , action)
      return {
        ...state,
        priceFilter: {
          ...state.priceFilter,
          minField: action.payload?.priceFilter?.minField,
          moveMin:{
            move: action.payload?.priceFilter?.moveMin.move,
            value: action.payload?.priceFilter?.moveMin.value
          }
        },
      }

    case SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN:
      console.log('SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN FIRED ', action)
      
      return{
        ...state,
        priceFilter: {
          ...state.priceFilter,
          minField: action.payload?.priceFilter?.range[0] || state.priceFilter?.minField,
          maxField: action.payload?.priceFilter?.range[1],
          //TODO: THE OR array after range needs to not be hard coded
          range: action.payload?.priceFilter?.range || state.priceFilter?.range ||[1, 12345678],
          moveMin : action.payload?.priceFilter?.moveMin,
          moveMax: action.payload?.priceFilter?.moveMax,
        }
      }


    case SET_MAX_PRICE_FILTER_FIELD:
      return {
        ...state,
        priceFilter: {
          ...state.priceFilter,
          maxField: action.payload?.priceFilter?.maxField,
        },
      }

    case SET_ACTIVE_SORT_CATEGORY:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          activeSort: action.payload?.sortAndFilter?.activeSort,
        },
        searchResults: {
          ...state.searchResults,
          data: action.payload?.searchResults?.data,
        },
      }

    case SET_IS_ASCENDING:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          isAscending: action.payload?.sortAndFilter?.isAscending,
        },
      }

    case SORT_LISTINGS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          data: {
            ...action.payload?.searchResults?.data,
          },
        },
      }

    case SET_CLICKED_ROW:
      return {
        ...state,
        listingTable: {
          ...state.listingTable,
          currentHome: action?.payload?.listingTable?.currentHome,
        },
      }

    case 'TESTING':
      return {
        ...state,
      }

    default:
      return state
  }
}

export default appReducer
