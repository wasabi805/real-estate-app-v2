import { IfilterButtons } from 'utils/dictionaries'
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
    }
    search?: {
      value?: string
      isAutoComplete?: boolean
    }

    searchResults?: {
      data: []
    }

    priceFilter: {
      range: number[]
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

    listingsFilters?: {
      isDrawerOpen?: boolean
      clickedFilterName: ''
      currentRange: number[] | []
      bedsButtons?: IfilterButtons[]
      bathsButtons?: IfilterButtons[]
    }

    listingTable?: {
      isTableView?: boolean
      currentHome?: string[]
    }
  }
}
