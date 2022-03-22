import { Ilisting } from 'actions/propertySearchBarActions/IPropertySearchBar'

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
  sortAndFilter: {
    activeSort: string
    sortedProperties: []
    isAscending: null | boolean
  }
  listingTable: {
    currentHome?: string[]
  }
  loginModal: {
    isLogin: boolean
    email: string
    confirmEmail: string
    password: string
  }
}
