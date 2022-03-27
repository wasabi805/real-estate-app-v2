import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
import {
  range,
  handleBedsNumAction,
  setInitialButtonsActive,
  deactivateBedButtons,
  activateBedButtons,
  setSingleButtonActive,
} from './helpers'
export const SET_FILTER_DRAWER_OPEN = 'SET_FILTER_DRAWER_OPEN'
export const setFilterDrawerOpen = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_FILTER_DRAWER_OPEN,
  payload: {
    listingsFilters: {
      isDrawerOpen: bool,
    },
  },
})

export const HANDLE_CLICK_BEDS_FILTER_BUTTON = 'HANDLE_CLICK_BEDS_FILTER_BUTTON'
export const handleClickBedsFilterButton = (
  key: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  let currentRange = state.listingsFilters?.currentRange.sort()
  const isStudio = key === 'studio'
  const isAny = key === 'any'

  if (!isStudio && !isAny) {
    let keyNum = parseInt(key[key.length - 1], 10)
    const isKeyNumPresent = currentRange.indexOf(keyNum) >= 0

    //if a range hasnt been set yet...
    if (!isKeyNumPresent && currentRange.length === 0) {
      const startRange = range.indexOf(keyNum)
      const returnRange = range.slice(startRange)
      return handleBedsNumAction(
        state,
        returnRange,
        setInitialButtonsActive(state, keyNum),
        keyNum
      )
    }

    // if only one value in the range..
    if (currentRange.length === 1) {
      if (keyNum < state.listingsFilters?.currentRange[0]) {
        //grab the new range
        const newRange = range.slice(
          range.indexOf(keyNum),
          state.listingsFilters?.currentRange[0]
        )
        const addAddtionalActiveBtns = state.listingsFilters?.bedsButtons?.map(
          (bedBtn) => {
            if (newRange.indexOf(bedBtn.value) >= 0) {
              bedBtn.isActive = true
              return bedBtn
            }
            bedBtn.isActive = false
            return bedBtn
          }
        )

        return handleBedsNumAction(
          state,
          newRange,
          addAddtionalActiveBtns,
          keyNum
        )
      }

      if (keyNum > state.listingsFilters?.currentRange[0]) {
        //grab the new range
        const newRange = range.slice(
          range.indexOf(state.listingsFilters?.currentRange[0]),
          keyNum
        )

        const addAddtionalActiveBtns = state.listingsFilters?.bedsButtons?.map(
          (bedBtn) => {
            if (newRange.indexOf(bedBtn.value) >= 0) {
              bedBtn.isActive = true
              return bedBtn
            }
            bedBtn.isActive = false
            return bedBtn
          }
        )

        return handleBedsNumAction(
          state,
          newRange,
          addAddtionalActiveBtns,
          keyNum
        )
      }
    }

    // a range exists
    if (currentRange && currentRange.length >= 2) {
      const rangeInReducer = state.listingsFilters?.currentRange
      const lastNumInRangeIdx = state.listingsFilters?.currentRange.length - 1
      const lastValue = state.listingsFilters?.currentRange[lastNumInRangeIdx]
      const firstValue = state.listingsFilters?.currentRange[0]
      const previousBtnClicked = state.listingsFilters?.clickedFilterName

      // if a number in the range is clicked twice in a row
      if (keyNum == previousBtnClicked) {
        const newRange = [keyNum]

        return handleBedsNumAction(
          state,
          newRange,
          setSingleButtonActive(state, keyNum),
          keyNum
        )
      }

      // if the clicked value is less than the lowest range number in the reducer...
      if (!isKeyNumPresent && keyNum < firstValue) {
        console.log('-----CASE:1------')
        //get the new range of numbers
        const newRange = range.slice(range.indexOf(keyNum), lastValue)

        return handleBedsNumAction(
          state,
          newRange,
          deactivateBedButtons(state, newRange),
          keyNum
        )
      }

      // range exists and number in range is clicked
      if (keyNum > previousBtnClicked) {
        console.log('-----CASE:2------')

        const newRange = range.slice(
          range.indexOf(state.listingsFilters?.currentRange[0]),
          keyNum
        )

        return handleBedsNumAction(
          state,
          newRange,
          deactivateBedButtons(state, newRange),
          keyNum
        )
      }

      //range exists but, clicked number is not in the range(set button active)
      if (!isKeyNumPresent && keyNum >= previousBtnClicked) {
        console.log('-----CASE:3------')

        const firstVal = rangeInReducer[0]
        const lastVal = keyNum

        const newRange = range.slice(range.indexOf(firstVal), lastVal)

        //TODO: validate the difference between addAddtionalActiveBtns && activateBedButtons
        //see if one need to get modified to make one of them reusable.
        const addAddtionalActiveBtns = state.listingsFilters?.bedsButtons?.map(
          (bedBtn) => {
            if (newRange.indexOf(bedBtn.value) >= 0) {
              bedBtn.isActive = true
              return bedBtn
            }
            bedBtn.isActive = false
            return bedBtn
          }
        )

        return handleBedsNumAction(
          state,
          newRange,
          addAddtionalActiveBtns,
          keyNum
        )
      }

      // if range exists, number is in range, clicked number value  is less that previously clicked button
      if (keyNum < previousBtnClicked) {
        console.log('-----CASE:4------')
        const newRange = range.slice(
          range.indexOf(keyNum),
          range.indexOf(
            range[
              state.listingsFilters?.currentRange[
                state.listingsFilters?.currentRange.length - 1
              ]
            ]
          )
        )
        const addAddtionalActiveBtns = state.listingsFilters?.bedsButtons?.map(
          (bedBtn) => {
            if (newRange.indexOf(bedBtn.value) >= 0) {
              bedBtn.isActive = true
              return bedBtn
            }
            bedBtn.isActive = false
            return bedBtn
          }
        )

        return handleBedsNumAction(
          state,
          newRange,
          addAddtionalActiveBtns,
          keyNum
        )
      }

      //bigger than prevClicked and is in the range
      if (isKeyNumPresent && keyNum > previousBtnClicked) {
        console.log('-----CASE:5------')
        const startSlice = range.indexOf(
          state.listingsFilters.clickedFilterName
        )
        const endSlice = range.indexOf(keyNum)
        const newRange = range.slice(startSlice, endSlice)
        console.log('what is the newRange', newRange)
      }
    }
  }

  //---------------------------
  return {
    type: 'TESTING',
  }
}

export const HANDLE_CLICK_BATHS_FILTER_BUTTON =
  'HANDLE_CLICK_BATHS_FILTER_BUTTON'
export const handleClickBathsFilterButton = (
  key: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: HANDLE_CLICK_BATHS_FILTER_BUTTON,
    payload: {
      listingsFilters: {
        bathsButtons: [],
      },
    },
  }
}
