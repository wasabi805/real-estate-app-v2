import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as ListingTabActions from 'actions/listingTabActions.ts'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as PriceFilterActions from 'actions/listingsFilterActions/priceActions'
import * as ListingsSortFilterActions from 'actions/listingsSortFilterActions'
import * as ListingTableActions from 'actions/listingsTableActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import * as ForSaleRentSoldActions from 'actions/listingsFilterActions/forSaleRentSoldActions'
import * as AllFiltersActions from 'actions/listingsFilterActions/allFiltersActions'
import { mockListings, mockAscendingPriceRange } from 'mockListings'
import { updateNestedObj } from 'utils/helpers'
import {
  filterByPropertyTypePath,
  soldDateRangePath,
  priceFilterPath,
  selectedHomeTypePath,
  bedsBathsPath,
  currentBathsPath,
  isDrawerOpenPath,
} from 'utils/contants'

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
  SET_BEDS_VALUES,

  SET_FILTER_BY_PROPERTY_TYPE,
  SET_FILTER_CURRENT_BATHS_AMOUNT,
} = ListingsFilterActions

const {
  SET_MIN_PRICE_FILTER_FIELD,
  SET_MAX_PRICE_FILTER_FIELD,
  SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
} = PriceFilterActions

const { SET_FILTER_DRAWER_OPEN } = AllFiltersActions

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

  listings: {
    // clickedFilterName: null,
    // currentRange: [],
    // bedsButtons: bedsButtons,

    filters: {
      forSaleRentSold: {
        filterBy: [],
        buttons: forSaleRentSoldButtons,

        //TODO VERIFY action and reducer interfaces
        soldDateRange: '',

        soldDateRangeColumns: soldDateRangeColumns,
        soldDateRangeRows: soldDateRangeRows,
      },

      price: {
        minField: null,
        maxField: null,
        /* used in slider and histogram */
        // allPrices: [],
        allPrices: mockAscendingPriceRange,

        slider: {
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

      allFilters: {
        isDrawerOpen: false,
      },
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
  /* PAYLOAD VARIABLES */

  let newPrice = {}
  let minField = action.payload?.listings?.filters?.price?.minField
  let maxField = action.payload?.listings?.filters?.price?.maxField

  let priceRange = action.payload?.listings?.filters?.price?.allPrices
  let moveMin = action.payload?.listings?.filters?.price?.slider?.moveMin
  let moveMax = action.payload?.listings?.filters?.price?.slider?.moveMax

  let filterByPropertyType = action.payload?.forSaleRentSold?.filterBy
  let soldDateRange = action.payload?.listings?.filters?.forSaleRentSold?.soldDateRange

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

    /* ----- FOR SALE RENT SOLD -----  */

    case SET_FILTER_BY_PROPERTY_TYPE:
      return updateNestedObj(filterByPropertyTypePath)(filterByPropertyType)(state)

    case SET_SOLD_DATE_RANGE:
      return updateNestedObj(soldDateRangePath)(soldDateRange)(state)

    /* ----- PRICE ----- */

    case SET_MIN_PRICE_FILTER_FIELD:
      newPrice = {
        ...state.listings?.filters.price,
        minField: minField,
        slider: {
          ...state.listings?.filters.price.slider,
          moveMin: moveMin,
        },
      }
      return updateNestedObj(priceFilterPath)(newPrice)(state)

    case SET_MAX_PRICE_FILTER_FIELD:
      newPrice = {
        ...state.listings?.filters.price,
        maxField: maxField,
        slider: {
          ...state.listings?.filters.price.slider,
          moveMax: moveMax,
        },
      }
      return updateNestedObj(priceFilterPath)(newPrice)(state)

    case SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN:
      newPrice = {
        ...state.listings?.filters.price,
        minField: priceRange !== undefined ? priceRange[0] : null,
        maxField: priceRange !== undefined ? priceRange[1] : null,
        slider: {
          ...state.listings?.filters?.price?.slider,
          moveMin: moveMin,
          moveMax: moveMax,
        },
      }
      return updateNestedObj(priceFilterPath)(newPrice)(state)

    /* ----- HOME-TYPE FILTERS ----- */

    case SET_SELECTED_HOME_TYPE:
      const selected = action.payload?.listings?.filters?.homeType?.selected
      return updateNestedObj(selectedHomeTypePath)(selected)(state)

    /* ----- BEDS BATHS ----- */

    case SET_BEDS_VALUES:
      const currentRange =
        action.payload?.listings?.filters?.bedsBaths?.currentRange
      const clickedNumber =
        action.payload?.listings?.filters?.bedsBaths?.clickedNumber

      return updateNestedObj(bedsBathsPath)({
        ...state.listings?.filters.bedsBaths,
        currentRange,
        clickedNumber,
      })(state)

    case SET_FILTER_CURRENT_BATHS_AMOUNT:
      const currentBaths =
        action.payload?.listings?.filters.bedsBaths?.currentBaths
      return updateNestedObj(currentBathsPath)(currentBaths)(state)

    /* ----- ALL FILTERS ----- */

    case SET_FILTER_DRAWER_OPEN:
      const isDrawerOpen =
        action.payload?.listings?.filters?.allFilters?.isDrawerOpen
      return updateNestedObj(isDrawerOpenPath)(isDrawerOpen)(state)

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
