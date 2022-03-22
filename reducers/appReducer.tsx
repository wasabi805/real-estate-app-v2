import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTableActions from 'actions/listingsTableActions'
import { mockListings } from 'mockListings'
import { IinitialState } from './interface'
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
const { SORT_LISTINGS, SET_IS_ASCENDING, SET_ACTIVE_SORT_CATEGORY } =
  ListingsSortFilterActions

const { SET_CLICKED_ROW } = ListingTableActions

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
      // listings: [],
      listings: mockListings,
    },
    // initialData: [],
    initialData: mockListings,
  },
  sortAndFilter: {
    activeSort: 'Price',
    sortedProperties: [],
    isAscending: null,
  },

  listingTable: {
    currentHome: [''],
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
          data: { ...action.payload?.data },
          initialData: { ...action.payload?.data },
        },
        fetchProperty: false,
        // listingTable:{
        //   currentHome:['foo']
        // }
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

    default:
      return state
  }
}

export default appReducer
