export interface IModalAction {
  type: string
  payload: {
    userLoginData?: IUserLoginData
    isLogin?: boolean
    dismissLoginModal?: boolean
  }
}

export interface IUserLoginData {
  email?: string
  password?: string
}
