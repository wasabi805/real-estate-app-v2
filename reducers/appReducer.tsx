export interface IinitialState {
  isLoginModalVisibile: boolean
}

export const initialState = {
  isLoginModalVisibile: false,
}

const appReducer = (state = initialState, action) => {
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
