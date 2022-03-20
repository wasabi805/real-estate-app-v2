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

    searchResults?: {
      data: []
    }

    addressObject?: {
      formatted_address: string
      geometry: {
        location: {
          '_.Ee': {
            lat: () => void
            lng: () => void
          }
        }
      }
      html_attributions: []
      name: string
      place_id: string
    }

    value?: string
    data?: []
    searchQueryString?: string
    isLogin?: boolean

    sortAndFilter?: {
      activeSort?: string
      sortedProperties?: []
      isAscending?: boolean
    }
  }
}