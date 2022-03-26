import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
import {
  range,
  handleBedsNumAction,
  setInitialButtonsActive,
  deactivateBedButtons,
  activateBedButtons,
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
    console.log('keyNum', keyNum)

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

    // a range exists
    if (currentRange && currentRange.length >= 2) {
      const rangeInReducer = state.listingsFilters?.currentRange
      const lastNumInRangeIdx = state.listingsFilters?.currentRange.length - 1
      const lastValue = state.listingsFilters?.currentRange[lastNumInRangeIdx]
      const firstValue = state.listingsFilters?.currentRange[0]
      const previousBtnClicked = state.listingsFilters?.clickedFilterName

      // if the clicked value is less than the lowest range number in the reducer...
      if (!isKeyNumPresent && keyNum < firstValue) {
        alert('case 1')
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
      if (isKeyNumPresent && keyNum >= previousBtnClicked) {
        alert('case 2')
        const newRange = range.slice(range.indexOf(previousBtnClicked), keyNum)
        return handleBedsNumAction(
          state,
          newRange,
          deactivateBedButtons(state, newRange),
          keyNum
        )
      }

      //range exists but, clicked number is not in the range(set button active)
      if (!isKeyNumPresent && keyNum >= previousBtnClicked) {
        alert('case 3')
        const newRange = rangeInReducer?.concat(keyNum)

        return handleBedsNumAction(
          state,
          newRange,
          activateBedButtons(state, keyNum),
          keyNum
        )
      }

      // if range exists, number is in range, clicked number value  is less that previously clicked button
      if (isKeyNumPresent && keyNum < previousBtnClicked) {
        const newRange = range.slice(
          range.indexOf(keyNum),
          range[lastNumInRangeIdx]
        )
        return handleBedsNumAction(
          state,
          newRange,
          deactivateBedButtons(state, newRange),
          keyNum
        )
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
