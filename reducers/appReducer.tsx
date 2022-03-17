import React from 'react'
import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/searchActions'
import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'
import { mockListings } from 'mockListings'

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
      data: {}
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

export interface IAction {
  type: string
  payload: {
    renderLoginModal?: boolean
    dismissLoginModal?: boolean
    userLoginData?: any
    search?: {
      value: string
      isAutoComplete: boolean
    }
    value: string
    data?: {}
    searchQueryString?: string
    isLogin: boolean
    addressObject: IGooglePlacesAddressObj
  }
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
    data: mockListings,
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
        },
        fetchProperty: false,
      }

    default:
      return state
  }
}

export default appReducer
