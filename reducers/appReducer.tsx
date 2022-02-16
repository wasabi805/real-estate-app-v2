import React from 'react'
import * as LoginModalActions from 'actions/modalActions'

const { RENDER_LOGIN_MODLE, DISMISS_LOGIN_MODLE } = LoginModalActions

export interface IinitialState {
  state: {
    isLoginModalVisibile: boolean
  }
  dispatch: React.Dispatch<IAction>
}

export interface IAction {
  type: string
  payload?: {}
}

export const initialState = {
  isLoginModalVisibile: false,
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

    default:
      return state
  }
}

export default appReducer
