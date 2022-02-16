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
