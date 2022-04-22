import { Ilisting } from 'actions/propertySearchBarActions/IPropertySearchBar'
import { IButtonWithIcon, IButton } from 'utils/interfaces/buttons'

interface IBedsButton {
  id: string
  text: string
}

export interface IinitialState {
  setIn: any
  isLoginModalVisibile: boolean
  user: {
    email: string
    passsword: string
  }
  search: {
    value: string
    isAutoComplete: boolean
  }
  fetchProperty: boolean
  searchResults: {
    data: {
      listings: Ilisting[]
    }
    initialData: []
  }

  filterDropdownsRow: {
    activeFilterPanel: string
  }

  priceFilter?: {
    //inputs
    minField?: null | number
    maxField?: null | number

    //slider
    range?: number[]
    moveMin: {
      move: boolean
      value: string
    }
    moveMax: {
      move: boolean
      value: string
    }
  }

  sortAndFilter: {
    activeSort: string
    sortedProperties: []
    isAscending: null | boolean
  }

  listings?: {
    isDrawerOpen?: boolean

    filters: {
      forSaleRentSold?: {
        filterBy?: []
        buttons?: IButton[]
      }

      homeType?: {
        homeTypeButtons: IButtonWithIcon[]
        selected?: string
      }
      bedsBaths?: {
        bedsButtons: IButton[]
        clickedNumber: Number | string
        range: Number[]
        currentRange: Number | string[]

        bathButtons?: IBedsButton[]
        currentBaths?: string
      }
      allFilters: {
        isDrawerOpen: boolean
      }
    }
  }

  listingTable: {
    isTableView: boolean
    currentHome: string[]
  }

  loginModal: {
    isLogin: boolean
    email: string
    confirmEmail: string
    password: string
  }
}
