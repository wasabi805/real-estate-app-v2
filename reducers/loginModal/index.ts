import { IReducerSlice } from 'reducers/interface'

export const renderLoginModal = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    isLoginModalVisibile: action.payload?.renderLoginModal,
  }
}

export const dismissLoginModal = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    isLoginModalVisibile: action.payload?.renderLoginModal,
  }
}

export const setIsLogin = <T extends IReducerSlice>({ state, action }: T) => {
  return {
    ...state,
    loginModal: {
      email: state.loginModal.email,
      isLogin: action.payload?.isLogin,
    },
  }
}

export const setLoginFormChange = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    loginModal: action.payload?.userLoginData,
  }
}
