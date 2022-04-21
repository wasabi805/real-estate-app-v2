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

    filterDropdownsRow?: {
      activeFilterPanel?: string
    }

    forSaleRentSold?: {
      filterBy: string[]
    }

    priceFilter?: {
      range?: number[]
      minField?: null | number
      maxField?: null | number
      moveMin: {
        move: boolean
        value: string
      }
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

    listings?: {
      isDrawerOpen?: boolean
      clickedFilterName?: ''
      currentRange?: number[] | []
      bedsButtons?: IfilterButtons[]

      filters: {
        forSaleRentSold?: {
          filterBy?: string[]
          soldDateRange?: any
          filterSoldDateRangeBy?: any
        }

        homeType?: {
          selected?: string
        }

        bedsBaths?: {
          currentBaths?: string
        }
      }
    }

    listingTable?: {
      isTableView?: boolean
      currentHome?: string[]
    }
  }
}
