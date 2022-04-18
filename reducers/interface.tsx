import { Ilisting } from 'actions/propertySearchBarActions/IPropertySearchBar'
import { IfilterButtons } from 'utils/dictionaries'

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

  forSaleRentSold: {
    filterBy?: []
    buttons?: [
      { name: string; value: string },
      { name: string; value: string },
      { name: string; value: string }
    ]
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

  //TODO REMOVE THIS
  homeType?: {
    selected?: string
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

    homeType?: {
      homeTypeButtons: []
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
