import { Ilisting } from 'actions/propertySearchBarActions/IPropertySearchBar'
import { IfilterButtons } from 'utils/dictionaries'

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
    bathsButtons?: IfilterButtons[]
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
