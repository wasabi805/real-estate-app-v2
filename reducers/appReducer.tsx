import * as LoginModalActions from 'actions/modalActions'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as ListingsActions from 'actions/ListingsActions'
import * as ListingsFilterActions from 'actions/ListingsActions/FilterActions/bedsBathsActions'
import * as PriceFilterActions from 'actions/ListingsActions/FilterActions/priceActions'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortActions'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import * as FilterDropdownsActions from 'actions/ListingsActions/FilterRowButtonActions'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as AllFiltersActions from 'actions/ListingsActions/FilterActions/allFiltersActions'
import * as SortListingsActions from 'actions/ListingsActions/SortActions'
import { mockListings, mockAscendingPriceRange } from 'mockListings'
import { updateNestedObj } from 'utils/helpers'
import {
  forSaleRentSoldPath,
  priceFilterPath,
  selectedHomeTypePath,
  bedsBathsPath,
  currentBathsPath,
  isDrawerOpenPath,
} from 'utils/contants'

import { IinitialState } from 'reducers/interface'
import { IAction } from 'actions/interface'
import {
  filterRowButtons,
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

const { SET_SELECTED_HOME_TYPE } = FilterDropdownsActions

const {
  SET_BEDS_VALUES,
  // SET_FILTER_BY_PROPERTY_TYPE,
  SET_FILTER_CURRENT_BATHS_AMOUNT,
} = ListingsFilterActions

const {
  SET_MIN_PRICE_FILTER_FIELD,
  SET_MAX_PRICE_FILTER_FIELD,
  SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
} = PriceFilterActions

const { SET_ACTIVE_FILTER_PANEL, UPDATE_FILTER_RESPONSE } = FilterActions
const { SET_FILTER_DRAWER_OPEN } = AllFiltersActions

const { SORT_LISTINGS, SET_IS_ASCENDING, SET_ACTIVE_SORT_CATEGORY } =
  ListingsSortFilterActions

const { SET_CLICKED_ROW } = ListingsActions
const { HOMES_VIEW_TAB_CLICKED } = ListingsActions
const { SET_SOLD_DATE_RANGE, SET_FILTER_BY_PROPERTY_TYPE } =
  ForSaleRentSoldActions

const { TOGGLE_SORT_LISTINGS_PANEL } = SortListingsActions

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
    // city: '',
    // state: '',

    city: 'santa monica',
    state: 'ca',

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

  // ALL LISTINGS PROPS
  listings: {
    isTableView: false,
    currentHome: ['2892620475'],

    filters: {
      filtersDict: {
        'for-sale-rest-sold': {
          order: 0,
          slug: '/homeType=',
        },

        price: {
          order: 1,
          slug: '/price=',
        },

        homeType: {
          order: 2,
          slug: '/homeType=',
        },
      },

      currentSetFilters: ['stuff', 'fooBar'],

      buttons: filterRowButtons,
      activeFilterPanel: '0',

      forSaleRentSold: {
        filterBy: ['all-filters-btn-for-sale'],
        buttons: forSaleRentSoldButtons,

        soldDateRange: [],
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

    sort: {
      criteria: 'Price',
      sortedHomes: [],

      isAscending: null,
      togglePanel: false,
    },
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

  let filterByPropertyType =
    action.payload?.listings?.filters?.forSaleRentSold?.filterBy
  let soldDateRange =
    action.payload?.listings?.filters?.forSaleRentSold?.soldDateRange

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
          city: action.payload?.searchResults?.city,
          state: action.payload?.searchResults?.state,
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
        action.payload?.listings?.filters?.activeFilterPanel

      return updateNestedObj(['listings', 'filters'])({
        ...state.listings.filters,
        activeFilterPanel,
      })(state)

    case HOMES_VIEW_TAB_CLICKED:
      return {
        ...state,
        listings: {
          ...state.listings,
          isTableView: action.payload?.listings?.isTableView,
        },
      }

    /* ----- FOR SALE RENT SOLD -----  */

    case SET_FILTER_BY_PROPERTY_TYPE:
      return updateNestedObj(forSaleRentSoldPath)({
        ...state.listings.filters.forSaleRentSold,
        filterBy: filterByPropertyType,
      })(state)

    case SET_SOLD_DATE_RANGE:
      return updateNestedObj(forSaleRentSoldPath)({
        ...state.listings.filters.forSaleRentSold,
        soldDateRange,
      })(state)

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
      let homeTypeFilters = action.payload.listings?.filters.currentSetFilters

      console.log('action', action)

      console.log('what is homeTypeFilters', homeTypeFilters)

      let updatedCurrentSetFilters = [
        ...state.listings.filters.currentSetFilters,
      ]
      const matches = updatedCurrentSetFilters.filter((s) =>
        s.includes('homeType')
      )

      if (matches.length === 0) {
        updatedCurrentSetFilters = [
          ...state.listings.filters.currentSetFilters,
          ...action.payload.listings?.filters.currentSetFilters,
        ]
      }

      if (matches.length > 0) {
        //get the index now

        console.log(updatedCurrentSetFilters, 'updatedCurrentSetFilters------')
        console.log(matches[0], 'mathces-----')
        console.log(updatedCurrentSetFilters.indexOf(matches[0]))

        //TODO : make this resuable
        const index = updatedCurrentSetFilters.indexOf(matches[0])
        updatedCurrentSetFilters[index] =
          action.payload.listings?.filters.currentSetFilters[0]
      }

      return updateNestedObj(['listings', 'filters'])({
        ...state.listings.filters,
        homeType: {
          ...state.listings.filters.homeType,
          selected: selected,
        },
        currentSetFilters: updatedCurrentSetFilters,
      })(state)

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
        action.payload?.listings?.filters?.bedsBaths?.currentBaths
      return updateNestedObj(currentBathsPath)(currentBaths)(state)

    /* ----- ALL FILTERS ----- */

    case SET_FILTER_DRAWER_OPEN:
      const isDrawerOpen =
        action.payload?.listings?.filters?.allFilters?.isDrawerOpen
      return updateNestedObj(isDrawerOpenPath)(isDrawerOpen)(state)

    case SET_ACTIVE_SORT_CATEGORY:
      return {
        ...state,

        listings: {
          ...state.listings,
          sort: {
            ...state.listings.sort,
            togglePanel: false,
            criteria: action.payload?.listings?.sort?.criteria,
            isAscending: action.payload?.listings?.sort?.isAscending,
          },
        },

        searchResults: {
          ...state.searchResults,
          data: action.payload?.searchResults?.data,
        },
      }

    /* ----- SORT LISTINGS ----- */

    case TOGGLE_SORT_LISTINGS_PANEL:
      return updateNestedObj(['listings', 'sort'])({
        ...state.listings.sort,
        togglePanel: !action.payload?.listings?.sort?.togglePanel,
      })(state)

    case SET_IS_ASCENDING:
      return {
        ...state,
        listings: {
          ...state.listings,
          sort: {
            ...state.listings.sort,
            togglePanel: false,
            criteria: action.payload?.listings?.sort?.criteria,
            isAscending: action.payload?.listings?.sort?.isAscending,
          },
        },

        searchResults: {
          ...state.searchResults,
          data: action.payload?.searchResults?.data,
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
        listings: {
          ...state.listings,
          currentHome: action?.payload?.listings?.currentHome,
        },
      }

    case 'TESTING':
      return {
        ...state,
      }

    case UPDATE_FILTER_RESPONSE:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default appReducer
