import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'

export interface IAction {
  type: string
  payload?: {
    renderLoginModal?: boolean
    dismissLoginModal?: boolean
    userLoginData?: {
      isLogin?: boolean
      dismissLoginModal?: boolean
      email?: string
      password?: string
      foo?: string
    }
    search?: {
      value?: string
      isAutoComplete?: boolean
    }
    value?: string
    data?: []
    searchQueryString?: string
    isLogin?: boolean
    addressObject?: IGooglePlacesAddressObj

    sortAndFilter?: {
      activeSort?: string
      sortedProperties?: []
      isAscending?: boolean
    }
  }
}
