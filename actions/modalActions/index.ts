import { IUserLoginData } from './interfaces'
import { IAction } from 'actions/interface'
export const RENDER_LOGIN_MODLE = 'RENDER_LOGIN_MODLE'
export const renderLoginModal = () => {
  alert('action fired')
  
  return {
    type: RENDER_LOGIN_MODLE,
    payload: { 
      renderLoginModal: true
     },
  }
}

export const DISMISS_LOGIN_MODLE = 'DISMISS_LOGIN_MODLE'
export const dismissLoginModal = (): Pick<IAction, 'type' | 'payload'> => ({
  type: DISMISS_LOGIN_MODLE,
  payload: { dismissLoginModal: false },
})

export const SET_IS_LOGIN = 'SET_IS_LOGIN'
export const setIsLogin = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_IS_LOGIN,
  payload: {
    isLogin: bool,
  },
})

export const SET_LOGIN_FORM_CHANGE = 'SET_LOGIN_FORM_CHANGE'
export const setLoginFormChange = (
  userLoginData: IUserLoginData
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_LOGIN_FORM_CHANGE,
  payload: {
    userLoginData,
  },
})
