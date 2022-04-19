import { Ilisting } from 'actions/propertySearchBarActions/IPropertySearchBar'
import { IfilterButtons } from 'utils/dictionaries'
import { IButtonWithIcon } from 'utils/interfaces/buttons'

interface IBedsButton {
  id: string
  text: string
}

export interface IinitialState {
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

  listingsFilters?: {
    isDrawerOpen?: boolean
    clickedFilterName: string
    currentRange: number[] | []
    bedsButtons?: IfilterButtons[]

    forSaleRentSold?: {
      filterBy?: []
      buttons?: [
        { id: string; text: string, size: string },
        { id: string; text: string, size: string },
        { id: string; text: string, size: string }
      ]
    }

    homeType?: {
      homeTypeButtons: IButtonWithIcon[]
      selected?: string
    }
    bedsBaths?: {
      bathButtons?: IBedsButton[]
      currentBaths?: string
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
