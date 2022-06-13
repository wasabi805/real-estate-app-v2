import { IinitialState } from 'reducers/interface'
import { mockListings, mockAscendingPriceRange } from 'mockListings'
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

const initialState: IinitialState = {
  isLoginModalVisibile: false,
  isLoading: false,
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
    prevRoute: '',
    routeTo: null,
    city: '',
    state: '',
    topCities: [],

    // city: 'santa monica',
    // state: 'ca',

    data: {
      listings: [],
      // listings: mockListings,
    },
    initialData: [],
    // initialData: mockListings,
  },

  filterDropdownsRow: {
    activeFilterPanel: '0',
  },

  // ALL LISTINGS PROPS
  listings: {
    isTableView: false,
    currentHome: ['2892620475'],

    filters: {
      filterButtonClicked: false,
      isLoading: false,
      currentSetFilters: [],
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

      buttons: filterRowButtons,
      activeFilterPanel: '0',

      forSaleRentSold: {
        filterBy: [''],
        buttons: forSaleRentSoldButtons,

        soldDateRange: [],
        soldDateRangeColumns: soldDateRangeColumns,
        soldDateRangeRows: soldDateRangeRows,
      },

      price: {
        minField: null,
        maxField: null,
        /* used in slider and histogram */
        allPrices: [],
        // allPrices: mockAscendingPriceRange,

        slider: {
          range: [],
          // range: mockAscendingPriceRange,
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
        newSelected: [],
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

export default initialState
