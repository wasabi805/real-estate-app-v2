import { IReducerSlice } from 'reducers/interface'
import { updateNestedObj } from 'utils/helpers'
import { filtersPath } from 'utils/contants'
import {
  forSaleRentSoldPath,
  priceFilterPath,
  bedsBathsPath,
  currentBathsPath,
  isDrawerOpenPath,
} from 'utils/contants'

/*----- ----- SORT LISTINGS  ----- -----*/
export const toggleSortListingsPanel = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return updateNestedObj(['listings', 'sort'])({
    ...state.listings.sort,
    togglePanel: !action.payload?.listings?.sort?.togglePanel,
  })(state)
}

export const setActiveSortCategory = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
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
}

export const setIsAscending = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      sort: {
        ...state.listings.sort,
        togglePanel: false,
        criteria: action?.payload?.listings?.sort?.criteria,
        isAscending: action?.payload?.listings?.sort?.isAscending,
      },
    },

    searchResults: {
      ...state.searchResults,
      data: action?.payload?.searchResults?.data,
    },
  }
}

export const setClickedRow = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      currentHome: action?.payload?.listings?.currentHome,
    },
  }
}

export const sortListings = <T extends IReducerSlice>({ state, action }: T) => {
  return updateNestedObj(['searchResults', 'data'])({
    ...action.payload?.searchResults?.data,
  })(state)
}

/*----- ----- FILTER LISTINGS  ----- -----*/
export const setActiveFilterPanel = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const activeFilterPanel = action.payload?.listings?.filters?.activeFilterPanel

  return updateNestedObj(['listings', 'filters'])({
    ...state.listings.filters,
    activeFilterPanel,
  })(state)
}

export const homeViewTabClicked = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      isTableView: action.payload?.listings?.isTableView,
    },
  }
}

/*----- ----- FILTER LISTINGS CATEGORIES ----- -----*/
export const updateFiltersUrls = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return updateNestedObj(['listings', 'filters', 'currentSetFilters'])(
    action.payload?.listings?.filters?.currentSetFilters
  )(state)
}
/* ----- FOR SALE RENT SOLD -----  */
export const setFilterByPropertyType = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { filterBy } = action.payload?.listings?.filters?.forSaleRentSold!

  return updateNestedObj(filtersPath)({
    ...state.listings.filters,
    filterButtonClicked: true,
    forSaleRentSold: {
      ...state.listings.filters.forSaleRentSold,
      filterBy,
    },
  })(state)
}

export const setSoldDateRange = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { soldDateRange } = action.payload?.listings?.filters?.forSaleRentSold!
  return updateNestedObj(forSaleRentSoldPath)({
    ...state.listings.filters.forSaleRentSold,
    soldDateRange,
  })(state)
}
/* ----- PRICE ----- */
export const setMinPriceFilterField = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { minField } = action.payload?.listings?.filters?.price!
  const { moveMin } = action.payload?.listings?.filters?.price?.slider!
  
  let filters = {
    ...state.listings?.filters,
    filterButtonClicked: true,
   price:{
     ...state.listings.filters.price,
     minField: minField,
     slider: {
       ...state.listings?.filters.price.slider,
       moveMin: moveMin,
     },
   }
  }
  return updateNestedObj(['listings', 'filters'])(filters)(state)
}

export const setMaxPriceFilterField = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { maxField } = action.payload?.listings?.filters?.price!
  let { moveMax } = action.payload?.listings?.filters?.price?.slider!


  let filters = {
    ...state.listings?.filters,
    filterButtonClicked: true,
   price:{
     ...state.listings.filters.price,
     maxField: maxField,
     slider: {
       ...state.listings?.filters.price.slider,
       moveMax: moveMax,
     },
   }
  }
  return updateNestedObj(['listings', 'filters'])(filters)(state)

  //OLD LOGIC
  // let newPrice = {
  //   ...state.listings?.filters.price,
  //   maxField: maxField,
  //   slider: {
  //     ...state.listings?.filters.price.slider,
  //     moveMax: moveMax,
  //   },
  // }
  // return updateNestedObj(priceFilterPath)(newPrice)(state)
}

export const setPricePriceRangeSliderMaxMin = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { moveMin, moveMax } = action.payload?.listings?.filters?.price?.slider!
  const { allPrices } = action.payload?.listings?.filters?.price!

  let newPrice = {
    ...state.listings?.filters.price,
    minField: allPrices !== undefined ? allPrices[0] : null,
    maxField: allPrices !== undefined ? allPrices[1] : null,
    slider: {
      ...state.listings?.filters?.price?.slider,
      moveMin: moveMin,
      moveMax: moveMax,
    },
  }
  return updateNestedObj(priceFilterPath)(newPrice)(state)
}

/* ----- HOME-TYPE FILTERS ----- */
export const setSelectedHomeType = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { selected, newSelected } = action.payload?.listings?.filters?.homeType!
  return updateNestedObj(['listings', 'filters'])({
    ...state.listings.filters,
    filterButtonClicked: true,
    isLoading: true,
    homeType: {
      ...state.listings.filters.homeType,
      selected,
      newSelected: newSelected,
    },
  })(state)
}

/* ----- BEDS BATHS FILTERS ----- */
export const newSetBedsValues = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      filters: {
        ...state.listings.filters,
        filterButtonClicked: true,
        bedsBaths: {
          ...state.listings.filters.bedsBaths,
          currentRange:
            action.payload?.listings?.filters?.bedsBaths?.currentRange,
          clickedNumber:
            action.payload?.listings?.filters?.bedsBaths?.clickedNumber,
        },
      },
    },
  }
}

export const setFilterCurrentBathsAmount = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const { currentBaths } = action.payload?.listings?.filters?.bedsBaths!
  // return updateNestedObj(currentBathsPath)(currentBaths)(state)
  return {
    ...state,
    listings: {
      ...state.listings,
      filters: {
        ...state.listings.filters,
        filterButtonClicked: true,
        bedsBaths: {
          ...state.listings.filters.bedsBaths,
          currentBaths: currentBaths
        },
      },
    },
  }
}

export const clearBedsBathsFilters = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      filters: {
        ...state.listings.filters,
        bedsBaths: {
          ...state.listings.filters.bedsBaths,
          currentBaths:
            action.payload?.listings?.filters?.bedsBaths?.currentBaths,
          currentRange:
            action.payload?.listings?.filters?.bedsBaths?.currentRange,
        },
      },
    },
  }
}

/* ----- ALL FILTERS ----- */
export const setFilterDrawerOpen = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  const isDrawerOpen =
    action.payload?.listings?.filters?.allFilters?.isDrawerOpen
  return updateNestedObj(isDrawerOpenPath)(isDrawerOpen)(state)
}

/* ----- RESET FILTER BUTTON CLICK ----- */
export const resetFilterButtonClicked = <T extends IReducerSlice>({
  state,
  action,
}: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      filters: {
        ...state.listings.filters,
        filterButtonClicked: false,
      },
    },
  }
}

export const testSetToFalse = <T extends IReducerSlice>({ state }: T) => {
  return {
    ...state,
    listings: {
      ...state.listings,
      filters: {
        ...state.listings.filters,
        isLoading: false,
      },
    },
  }
}
