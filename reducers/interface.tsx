import React from 'react'
import { IAction } from 'actions/interface'

export interface IinitialState {
  state: {
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
      isAscending: boolean
    }

    loginModal: {
      isLogin: true
      email: string
      password: string
      confirmPassword: string
    }
  }
  dispatch: React.Dispatch<IAction>
}
