export const RENDER_LOGIN_MODLE = 'RENDER_LOGIN_MODLE'
export const renderLoginModal = {
  type: RENDER_LOGIN_MODLE,
  payload: { renderLoginModal: true },
}

export const DISMISS_LOGIN_MODLE = 'DISMISS_LOGIN_MODLE'
export const dismissLoginModal = {
  type: DISMISS_LOGIN_MODLE,
  payload: { dismissLoginModal: false },
}

export const SET_LOGIN_FORM_CHANGE = 'SET_LOGIN_FORM_CHANGE'

export const setLoginFormChange = (userLoginData) => {
  return {
    type: SET_LOGIN_FORM_CHANGE,
    payload: {
      userLoginData,
    },
  }
}
