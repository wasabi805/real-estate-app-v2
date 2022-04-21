import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as ListingTabActions from 'actions/listingTabActions.ts'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTableActions from 'actions/listingsTableActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import * as ForSaleRentSoldActions from 'actions/listingsFilterActions/forSaleRentSoldActions'
import { mockListings, mockAscendingPriceRange } from 'mockListings'
import { updateNestedObj } from 'utils/helpers'

import { IinitialState } from 'reducers/interface'
import { IAction } from 'actions/interface'
import {
  forSaleRentSoldButtons,
  soldDateRangeColumns,
  soldDateRangeRows,
  homeTypeButtons,
  bathButtons,
  bedsButtons,
  bedsButtonFilterRange,
} from 'reducers/initialValues'

const {
  RENDER_LOGIN_MODLE,
  DISMISS_LOGIN_MODLE,
  SET_IS_LOGIN,
  SET_LOGIN_FORM_CHANGE,
} = LoginModalActions

const {
  SET_SEARCH_FIELD,
  AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS,
  UPDATE_STATE_WITH_SEARCH_RESULTS,
} = SearchActions

const { SET_ACTIVE_FILTER_PANEL, SET_SELECTED_HOME_TYPE } =
  FilterDropdownsActions

const {
  SET_FILTER_DRAWER_OPEN,
  SET_BEDS_VALUES,
  SET_MIN_PRICE_FILTER_FIELD,
  SET_MAX_PRICE_FILTER_FIELD,
  SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
  SET_FILTER_BY_PROPERTY_TYPE,
  SET_FILTER_CURRENT_BATHS_AMOUNT,
} = ListingsFilterActions

const { SORT_LISTINGS, SET_IS_ASCENDING, SET_ACTIVE_SORT_CATEGORY } =
  ListingsSortFilterActions

const { SET_CLICKED_ROW } = ListingTableActions
const { HOMES_VIEW_TAB_CLICKED } = ListingTabActions
const { SET_SOLD_DATE_RANGE } = ForSaleRentSoldActions

export const initialState: IinitialState = {
  isLoginModalVisibile: false,
  user: {
    password: '',
    email: '',
  },
  search: {
    value: '',
    isAutoComplete: false,
  },
  fetchProperty: false,
  searchResults: {
    data: {
      // listings: [],
      listings: mockListings,
    },
    // initialData: [],
    initialData: mockListings,
  },

  filterDropdownsRow: {
    activeFilterPanel: '0',
  },

  //TODO : nest priceFilter in listingsFilters
  priceFilter: {
    //inputs
    minField: null,
    maxField: null,

    //slider

    // range: [],
    range: mockAscendingPriceRange,

    moveMin: {
      move: false,
      value: '',
    },
    moveMax: {
      move: false,
      value: '',
    },
  },

  listings: {
    filters: {
      forSaleRentSold: {
        filterBy: [],
        buttons: forSaleRentSoldButtons,
        soldDateRange: '',
        soldDateRangeColumns: soldDateRangeColumns,
        soldDateRangeRows: soldDateRangeRows,
      },

      homeType: {
        homeTypeButtons: homeTypeButtons,
        selected: '',
      },

      bedsBaths: {
        bedsButtons,
        clickedNumber: 0,
        range: bedsButtonFilterRange,
        currentRange: [],

        bathButtons: bathButtons,
        currentBaths: '',
      },

      allFilters:{
        isDrawerOpen: false,
      }
    },
  },

  sortAndFilter: {
    activeSort: 'Price',
    sortedProperties: [],
    isAscending: null,
  },

  listingTable: {
    isTableView: false,
    // currentHome: [''],
    currentHome: ['2892620475'],
  },

  loginModal: {
    isLogin: true,
    email: '',
    confirmEmail: '',
    password: '',
  },
}

const appReducer = (state: IinitialState, action: IAction) => {
  switch (action.type) {
    //  LOGIN MODAL
    case RENDER_LOGIN_MODLE:
      return {
        ...state,
        isLoginModalVisibile: action.payload?.renderLoginModal,
      }

    case DISMISS_LOGIN_MODLE:
      return {
        ...state,
        isLoginModalVisibile: action.payload?.dismissLoginModal,
      }

    case SET_IS_LOGIN:
      return {
        ...state,
        loginModal: {
          email: state.loginModal.email,
          isLogin: action.payload?.isLogin,
        },
      }

    case SET_LOGIN_FORM_CHANGE:
      return {
        ...state,
        loginModal: action.payload?.userLoginData,
      }

    case SET_SEARCH_FIELD:
      return {
        ...state,
        fetchProperty: false,
        search: {
          ...state.search,
          value: action.payload?.value,
        },
      }

    case AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS:
      return {
        ...state,
        search: {
          ...state.search,
          value:
            action.payload?.addressObject?.formatted_address ||
            action.payload?.addressObject?.name,
          isAutoComplete: action.payload?.addressObject?.formatted_address
            ? true
            : false,
        },
        fetchProperty: true,
      }
    case UPDATE_STATE_WITH_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: {
          data: { ...action.payload?.searchResults?.data },
          initialData: { ...action.payload?.searchResults?.data },
        },
        fetchProperty: false,
        listingTable: {
          currentHome: [
            action.payload?.searchResults?.data.listings[0].property_id,
          ], //set the first property for the Listing table view
        },
        priceFilter: {
          range: action.payload?.priceFilter.range,
          moveMin: {
            move: false,
            value: '',
          },
          moveMax: {
            move: false,
            value: '',
          },
        },
      }

    case SET_ACTIVE_FILTER_PANEL:
      const activeFilterPanel =
        action.payload?.filterDropdownsRow?.activeFilterPanel
      return updateNestedObj(['filterDropdownsRow', 'activeFilterPanel'])(
        activeFilterPanel
      )(state)

    case HOMES_VIEW_TAB_CLICKED:
      const isTableView = action.payload?.listingTable?.isTableView
      return updateNestedObj(['listingTable', 'isTableView'])(isTableView)(
        state
      )

    case SET_FILTER_DRAWER_OPEN:
      const isDrawerOpen = action.payload?.listings?.filters?.allFilters?.isDrawerOpen
      return updateNestedObj(['listings', 'filters', 'allFilters', 'isDrawerOpen'])(isDrawerOpen)(state)

    case SET_SELECTED_HOME_TYPE:
      const selected = action.payload?.listings?.filters?.homeType?.selected
      return updateNestedObj(['listings', 'filters', 'homeType', 'selected'])(
        selected
      )(state)

    case SET_FILTER_BY_PROPERTY_TYPE:
      const filterBy = action.payload?.forSaleRentSold?.filterBy
      return updateNestedObj([
        'listings',
        'filters',
        'forSaleRentSold',
        'filterBy',
      ])(filterBy)(state)

    case SET_SOLD_DATE_RANGE:
      const soldDateRange =
        action.payload?.listings?.filters?.forSaleRentSold?.soldDateRange
      return updateNestedObj([
        'listings',
        'filters',
        'forSaleRentSold',
        'soldDateRange',
      ])(soldDateRange)(state)

    case SET_BEDS_VALUES:
      const currentRange =
        action.payload?.listings?.filters?.bedsBaths?.currentRange
      const clickedNumber =
        action.payload?.listings?.filters?.bedsBaths?.clickedNumber

      return updateNestedObj(['listings', 'filters', 'bedsBaths'])({
        ...state.listings?.filters.bedsBaths,
        currentRange,
        clickedNumber,
      })(state)

    case SET_FILTER_CURRENT_BATHS_AMOUNT:
      const currentBaths =
        action.payload?.listings?.filters.bedsBaths?.currentBaths
      return updateNestedObj([
        'listings',
        'filters',
        'bedsBaths',
        'currentBaths',
      ])(currentBaths)(state)

    case SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN:
      return {
        ...state,
        priceFilter: {
          ...state.priceFilter,
          minField:
            action.payload?.priceFilter?.range[0] ||
            state.priceFilter?.minField,
          maxField:
            action.payload?.priceFilter?.range[1] ||
            state.priceFilter?.maxField,
          //TODO: THE OR array after range needs to not be hard coded
          range: action.payload?.priceFilter?.range ||
            state.priceFilter?.range || [0, 12345678],
          moveMin: action.payload?.priceFilter?.moveMin,
          moveMax: action.payload?.priceFilter?.moveMax,
        },
      }

    case SET_MIN_PRICE_FILTER_FIELD:
      return {
        ...state,
        priceFilter: {
          ...state.priceFilter,
          minField: action.payload?.priceFilter?.minField,
          moveMin: {
            move: action.payload?.priceFilter?.moveMin.move,
            value: action.payload?.priceFilter?.moveMin.value,
          },
        },
      }

    case SET_MAX_PRICE_FILTER_FIELD:
      return {
        ...state,
        priceFilter: {
          ...state.priceFilter,
          maxField: action.payload?.priceFilter?.maxField,
          moveMax: {
            move: action.payload?.priceFilter?.moveMax.move,
            value: action.payload?.priceFilter?.moveMax.value,
          },
        },
      }

    case SET_ACTIVE_SORT_CATEGORY:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          activeSort: action.payload?.sortAndFilter?.activeSort,
        },
        searchResults: {
          ...state.searchResults,
          data: action.payload?.searchResults?.data,
        },
      }

    case SET_IS_ASCENDING:
      return {
        ...state,
        sortAndFilter: {
          ...state.sortAndFilter,
          isAscending: action.payload?.sortAndFilter?.isAscending,
        },
      }

    case SORT_LISTINGS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          data: {
            ...action.payload?.searchResults?.data,
          },
        },
      }

    case SET_CLICKED_ROW:
      return {
        ...state,
        listingTable: {
          ...state.listingTable,
          currentHome: action?.payload?.listingTable?.currentHome,
        },
      }

    case 'TESTING':
      return {
        ...state,
      }

    default:
      return state
  }
}

export default appReducer
