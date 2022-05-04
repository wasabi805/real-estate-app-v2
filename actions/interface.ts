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
      isTableView?: boolean
      currentHome?: string[]

      filters?: {
        activeFilterPanel?: string
        currentSetFilters?: string[]

        forSaleRentSold?: {
          filterBy?: string[]
          soldDateRange?: any
          filterSoldDateRangeBy?: any
        }

        price?: {
          minField?: null | number
          maxField?: null | number
          allPrices?: number[] | []

          slider?: {
            moveMin?: {
              move?: boolean
              value?: string
            }
            moveMax?: {
              move?: boolean
              value?: string
            }
          }
        }

        homeType?: {
          selected?: string
        }

        bedsBaths?: {
          currentBaths?: string
          currentRange?: Number | string[]
          clickedNumber?: Number | string
        }
        allFilters?: {
          isDrawerOpen?: boolean
        }
      }

      sort?: {
        togglePanel?: boolean
        criteria?: string
        sortedHomes?: []
        isAscending?: null | boolean
      }
    }

    listingTable?: {
      isTableView?: boolean
      currentHome?: string[]
    }
  }
}
