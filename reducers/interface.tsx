import React from 'react'
import { IAction } from 'actions/interface'

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
      listings: []
    }
    initialData: []
  }
  sortAndFilter: {
    activeSort: string
    sortedProperties: []
    isAscending: null | boolean
  }
  loginModal: {
    isLogin: boolean
    email: string
    confirmEmail: string
    password: string
  }

  dispatch: React.Dispatch<IAction>
}
