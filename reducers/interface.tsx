import React from 'react'
import { IAction } from 'actions/interface'

export interface IinitialState {
  //TODO: loginModal, sortAndFilter, and searchResults works correctly.
  // These are also nested inside state inside this interface. Will need to remove the other keys nested in state
  //inside this interface and get rid of state. 
  //
  loginModal:{
    email: string
  }
  sortAndFilter:{
    activeSort:any
  }
  searchResults:any,



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
