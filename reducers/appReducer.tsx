import React from 'react'
import * as LoginModalActions from 'actions/modalActions'

const { RENDER_LOGIN_MODLE, DISMISS_LOGIN_MODLE, SET_LOGIN_FORM_CHANGE } =
  LoginModalActions

export interface IinitialState {
  state: {
    isLoginModalVisibile: boolean
    user: {
      email: string
      passsword: string
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
  }
}

export const initialState = {
  isLoginModalVisibile: false,
  user: { password: '', email: '' },
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

    case SET_LOGIN_FORM_CHANGE:
      const { userLoginData } = action.payload

      const name = Object.keys(userLoginData).pop()
      const value = Object.values(userLoginData).pop()

      return {
        ...state,
        user: {
          ...state.user,
          [name]: value,
        },
      }

    default:
      return state
  }
}

export default appReducer
