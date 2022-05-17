/*----- ACTIONS -----*/
import * as GlobalActions from 'actions/GlobalActions'
import * as LoginModalActions from 'actions/modalActions'
import * as PropertySearchBarActions from 'actions/propertySearchBarActions'
import * as ListingsActions from 'actions/ListingsActions'
import * as ListingsFilterActions from 'actions/ListingsActions/FilterActions/bedsBathsActions'
import * as PriceFilterActions from 'actions/ListingsActions/FilterActions/priceActions'
import * as ListingsSortFilterActions from 'actions/ListingsActions/SortActions'
import * as FilterActions from 'actions/ListingsActions/FilterActions'
import * as FilterDropdownsActions from 'actions/ListingsActions/FilterRowButtonActions'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as AllFiltersActions from 'actions/ListingsActions/FilterActions/allFiltersActions'
import * as SortListingsActions from 'actions/ListingsActions/SortActions'
import * as NewBedsBathsActions from 'actions/ListingsActions/FilterActions/newBedsBathsActions'

/*----- REDUCER SLICES -----*/
import * as GlobalSlice from 'reducers/global'
import * as LoginModalSlice from 'reducers/loginModal'
import * as LocationAutoCompSlice from 'reducers/locationAutoComp'
import * as ListingsFiltersSlice from 'reducers/listings'

/*----- INTERFACES -----*/
import { IinitialState } from 'reducers/interface'
import { IAction } from 'actions/interface'

/*----- TYPES -----*/

const { SET_IS_LOADING } = GlobalActions

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
  FETCH_SUGGESTION_SUCCESS
} = PropertySearchBarActions

const {
  SET_MIN_PRICE_FILTER_FIELD,
  SET_MAX_PRICE_FILTER_FIELD,
  SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
} = PriceFilterActions

const { SET_SELECTED_HOME_TYPE } = FilterDropdownsActions
const { NEW_SET_BEDS_VALUES } = NewBedsBathsActions

const { SET_ACTIVE_FILTER_PANEL, UPDATE_FILTERS_URLS } = FilterActions

const {
  // SET_FILTER_BY_PROPERTY_TYPE,
  SET_FILTER_CURRENT_BATHS_AMOUNT,
  CLEAR_BEDS_BATHS_FILTERS,
} = ListingsFilterActions

const { SORT_LISTINGS, SET_IS_ASCENDING, SET_ACTIVE_SORT_CATEGORY } =
  ListingsSortFilterActions

const { SET_CLICKED_ROW } = ListingsActions
const { HOMES_VIEW_TAB_CLICKED } = ListingsActions
const { SET_SOLD_DATE_RANGE, SET_FILTER_BY_PROPERTY_TYPE } =
  ForSaleRentSoldActions

const { TOGGLE_SORT_LISTINGS_PANEL } = SortListingsActions

const appReducer = (state: IinitialState, action: IAction) => {
  /*----- APP STATE -----*/

  const handleSetIsLoading = () => GlobalSlice.setIsLoading({ state, action })

  /*----- LOGIN MODAL -----*/

  const handleRenderLoginModal = () =>
    LoginModalSlice.renderLoginModal({ state, action })

  const handleDismissLoginModle = () =>
    LoginModalSlice.dismissLoginModal({ state, action })

  const handleIsLogin = () => LoginModalSlice.setIsLogin({ state, action })

  const handleLoginFormChange = () =>
    LoginModalSlice.setIsLogin({ state, action })

  /*----- AUTO COMPLETE SERCH FIELD -----*/

  const handleSetSearchField = () =>
    LocationAutoCompSlice.setSeachField({ state, action })

  const handleUpdateAutoCompField = () =>
    LocationAutoCompSlice.autoCompleteUpdateInputAndFetchListings({
      state,
      action,
    })

  const handleUpdateLocation = () =>
    LocationAutoCompSlice.updateStateWithSearchResults({ state, action })

    const handleFetchSuggestionSuccess = ()=>LocationAutoCompSlice.fetchSuggestionSuccess({state, action})

  /*----- SORT LISTINGS ROW BUTTONS-----*/

  const handleToggleSortListingsPanel = () =>
    ListingsFiltersSlice.toggleSortListingsPanel({ state, action })
  const handleSetActiveSortCategory = () =>
    ListingsFiltersSlice.setActiveSortCategory({ state, action })
  const handleSetIsAscending = () =>
    ListingsFiltersSlice.setIsAscending({ state, action })
  const handleSortListings = () =>
    ListingsFiltersSlice.sortListings({ state, action })
  const handleSetClickedRow = () =>
    ListingsFiltersSlice.setClickedRow({ state, action })

  /*----- FILTER LISTINGS ROW BUTTONS-----*/
  const handleSetActiveFilterPanel = () =>
    ListingsFiltersSlice.setActiveFilterPanel({ state, action })
  const handleHomesViewTabClicked = () =>
    ListingsFiltersSlice.homeViewTabClicked({ state, action })

  /*----- FILTER LISTINGS CATEGORIES -----*/
  const handleUpdateFiltersUrls = () =>
    ListingsFiltersSlice.updateFiltersUrls({ state, action })

  /* ----- ----- FOR SALE RENT SOLD */
  const handleSetFilterByPropertyType = () =>
    ListingsFiltersSlice.setFilterByPropertyType({ state, action })
  const handleSetSoldDateRange = () =>
    ListingsFiltersSlice.setSoldDateRange({ state, action })

  /* ----- ----- PRICE */
  const handleSetMinPriceFilterField = () =>
    ListingsFiltersSlice.setMinPriceFilterField({ state, action })
  const handleSetMaxPriceFilterField = () =>
    ListingsFiltersSlice.setMaxPriceFilterField({ state, action })
  const handleSetPricePriceRangeSliderMaxMin = () =>
    ListingsFiltersSlice.setPricePriceRangeSliderMaxMin({ state, action })

  /* ----- ----- HOME-TYPE FILTERS */
  const handleSetSelectedHomeType = () =>
    ListingsFiltersSlice.setSelectedHomeType({ state, action })

  /* ----- BEDS BATHS FILTERS */
  const handleNewSetBedsValues = () =>
    ListingsFiltersSlice.newSetBedsValues({ state, action })
  const handleSetFilterCurrentBathsAmount = () =>
    ListingsFiltersSlice.setFilterCurrentBathsAmount({ state, action })
  const handleClearBedsBathsFilters = () =>
    ListingsFiltersSlice.clearBedsBathsFilters({ state, action })

  /* ----- ALL FILTERS  */
  const { SET_FILTER_DRAWER_OPEN } = AllFiltersActions
  const handleSetFilterDrawerOpen = () =>
    ListingsFiltersSlice.setFilterDrawerOpen({ state, action })

  const setState: Record<string, () => void> = {
    /*-----  GLOBAL -----*/
    [SET_IS_LOADING]: handleSetIsLoading,

    /*-----  LOGIN MODAL -----*/
    [RENDER_LOGIN_MODLE]: handleRenderLoginModal,
    [DISMISS_LOGIN_MODLE]: handleDismissLoginModle,
    [SET_IS_LOGIN]: handleIsLogin,
    [SET_LOGIN_FORM_CHANGE]: handleLoginFormChange,

    /*----- AUTO COMPLETE SERCH FIELD -----*/
    [SET_SEARCH_FIELD]: handleSetSearchField,
    [AUTO_COMPLETE_UPDATE_INPUT_AND_FETCH_LISTINGS]: handleUpdateAutoCompField,
    [UPDATE_STATE_WITH_SEARCH_RESULTS]: handleUpdateLocation,
    [FETCH_SUGGESTION_SUCCESS]: handleFetchSuggestionSuccess,

    /*----- SORT LISTINGS ROW BUTTONS-----*/
    [TOGGLE_SORT_LISTINGS_PANEL]: handleToggleSortListingsPanel,
    [SET_ACTIVE_SORT_CATEGORY]: handleSetActiveSortCategory,
    [SET_IS_ASCENDING]: handleSetIsAscending,
    [SORT_LISTINGS]: handleSortListings,
    [SET_CLICKED_ROW]: handleSetClickedRow,

    /*----- FILTER LISTINGS ROW BUTTONS-----*/
    [SET_ACTIVE_FILTER_PANEL]: handleSetActiveFilterPanel,
    [HOMES_VIEW_TAB_CLICKED]: handleHomesViewTabClicked,

    /*----- FILTER LISTINGS CATEGORIES -----*/
    [UPDATE_FILTERS_URLS]: handleUpdateFiltersUrls,

    /* ----- ----- FOR SALE RENT SOLD */
    [SET_FILTER_BY_PROPERTY_TYPE]: handleSetFilterByPropertyType,
    [SET_SOLD_DATE_RANGE]: handleSetSoldDateRange,

    /* ----- ----- PRICE */
    [SET_MIN_PRICE_FILTER_FIELD]: handleSetMinPriceFilterField,
    [SET_MAX_PRICE_FILTER_FIELD]: handleSetMaxPriceFilterField,
    [SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN]:
      handleSetPricePriceRangeSliderMaxMin,

    /* ----- ----- HOME-TYPE FILTERS */
    [SET_SELECTED_HOME_TYPE]: handleSetSelectedHomeType,

    /* ----- BEDS BATHS FILTERS */
    [NEW_SET_BEDS_VALUES]: handleNewSetBedsValues,
    [SET_FILTER_CURRENT_BATHS_AMOUNT]: handleSetFilterCurrentBathsAmount,
    [CLEAR_BEDS_BATHS_FILTERS]: handleClearBedsBathsFilters,

    /* ----- ALL FILTERS  */
    [SET_FILTER_DRAWER_OPEN]: handleSetFilterDrawerOpen,
  }
  return setState[action.type]()
}

export default appReducer
