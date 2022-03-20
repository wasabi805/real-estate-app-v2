import React from 'react'
import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/searchActions'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'
import { mockListings } from 'mockListings'
import { TDismissLoginModal } from 'actions/modalActions/interfaces'
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

export interface IinitialState {
  state: {
    isLoginModalVisibile: boolean
    user: {
      email: string
      passsword: string
    }
    search: {
      value: string
      isAutoComplete: boolean
    }
    fetchProperty: boolean
    searchResults: {
      data: {
        listings: []
      }
      initialData: []
    }
    sortAndFilter: {
      activeSort: string
      sortedProperties: []
      isAscending: boolean
    }

    loginModal: {
      isLogin: true
      email: string
      password: string
      confirmPassword: string
    }
  }
  dispatch: React.Dispatch<IAction>
}

export const initialState = {
  isLoginModalVisibile: false,
  user: { password: '', email: '' },
  search: {
    value: '',
    isAutoComplete: false,
  },
  fetchProperty: false,
  searchResults: {
    data: {
      listings: mockListings,
    },
    initialData: mockListings,
  },
  sortAndFilter: {
    activeSort: 'Price',
    sortedProperties: [],
    isAscending: null,
  },

  loginModal: {
    isLogin: true,
    email: '',
    confirmEmail: '',
    password: '',
  },
}

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    //  LOGIN MODAL
    case RENDER_LOGIN_MODLE:
      const { renderLoginModal } = action.payload

      return {
        ...state,
        isLoginModalVisibile: renderLoginModal,
      }

    case DISMISS_LOGIN_MODLE:
      const { dismissLoginModal } = action.payload
      return {
        ...state,
        isLoginModalVisibile: dismissLoginModal,
      }

    case SET_IS_LOGIN:
      return {
        ...state,
        loginModal: {
          email: state.loginModal.email,
          isLogin: action.payload.isLogin,
        },
      }

    case SET_LOGIN_FORM_CHANGE:
      const { userLoginData } = action.payload

      const name = Object.keys(userLoginData).pop()

      return {
        ...state,
        loginModal: {
          ...state.loginModal,
          [name]: Object.values(userLoginData).pop(),
        },
      }

    case SET_SEARCH_FIELD:
      return {
        ...state,
        fetchProperty: false,
        search: {
          ...state.search,
          value: action.payload.value,
        },
      }

    case AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS:
      return {
        ...state,
        search: {
          ...state.search,
          value:
            action.payload.addressObject.formatted_address ||
            action.payload.addressObject.name,
          isAutoComplete: action.payload.addressObject.formatted_address
            ? true
            : false,
        },
        fetchProperty: true,
      }
    case UPDATE_STATE_WITH_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: {
          data: { ...action.payload.data },
          initialData: { ...action.payload.data },
        },
        fetchProperty: false,
      }

    case SET_ACTIVE_SORT_CATEGORY:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          activeSort: action.payload.sortAndFilter.activeSort,
        },
        searchResults: {
          ...state.searchResults,
          // data: {
          //   listings: action.payload.searchResults.data,
          // },
          data: action.payload.searchResults.data,
        },
      }

    case SET_IS_ASCENDING:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          isAscending: action.payload.sortAndFilter.isAscending,
        },
      }

    case SORT_LISTINGS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          // data: {
          //   listings: action.payload.searchResults.data,
          // },
          data: {
            ...action.payload.searchResults.data,
          },
        },
      }

    default:
      return state
  }
}

export default appReducer
