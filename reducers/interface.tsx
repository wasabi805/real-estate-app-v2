import { Ilisting } from 'actions/propertySearchBarActions/interface'
import { IButtonWithIcon, IButton } from 'utils/interfaces/buttons'
import { ISoldDateRangeRows } from 'utils/interfaces/tables'
import { IAntTableSelectedRow } from 'utils/interfaces/antDesign'
import { IAction } from 'actions/interface'

export interface IReducerSlice {
  state: IinitialState
  action: IAction
}

interface IBedsButton {
  id: string
  text: string
}

export interface IinitialState {
  setIn: any

  isLoading: boolean
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
    prevRoute: string
    routeTo: null | string
    data: {
      listings: Ilisting[]
    }
    initialData: []
    city: string
    state: string
    topCities: any
  }

  filterDropdownsRow: {
    activeFilterPanel: string
  }

  sortAndFilter: {
    activeSort: string
    sortedProperties: []
    isAscending: null | boolean
  }

  listings: {
    isTableView: boolean
    // currentHome: [''],
    currentHome: string[]

    filters: {
      filterButtonClicked: boolean
      activeFilterPanel: string
      currentSetFilters: string[]

      forSaleRentSold: {
        filterBy: []
        buttons: IButton[]
        soldDateRange: string[] | []
        soldDateRangeColumns: { dataIndex: string; title: string }[]
        soldDateRangeRows: { key: string; soldDatePeriod: string }[]
      }

      price: {
        minField: null | number
        maxField: null | number
        allPrices: number[] | []

        slider: {
          range: number[]
          moveMin: {
            move: boolean
            value: string
          }
          moveMax: {
            move: boolean
            value: string
          }
        }
      }

      homeType: {
        homeTypeButtons: IButtonWithIcon[]
        selected: string
        newSelected: string[]
      }
      bedsBaths: {
        bedsButtons: IButton[]
        clickedNumber: Number | string
        range: Number[]
        currentRange: Number | string[]

        bathButtons: IBedsButton[]
        currentBaths: string
      }
      allFilters: {
        isDrawerOpen: boolean
      }
    }

    sort: {
      togglePanel: boolean
      criteria: string
      sortedHomes: []
      isAscending: null | boolean
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
