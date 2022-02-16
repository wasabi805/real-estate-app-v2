import React from 'react'

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

interface IappReducer{
    state: IinitialState
    action: IAction
}

const appReducer = (state=initialState, action: IAction) => {
  switch (action.type) {
    case 'SET_LOGIN_MODLE_VISIBLE':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default appReducer
