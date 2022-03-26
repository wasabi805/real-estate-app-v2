import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
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

  const handleBedsNumAction = (
    currentRange,
    bedsButtons,
    clickedFilterName
  ) => {
    return {
      type: HANDLE_CLICK_BEDS_FILTER_BUTTON,
      payload: {
        listingsFilters: {
          ...state.listingsFilters,
          currentRange: currentRange,
          bedsButtons: bedsButtons,
          clickedFilterName: clickedFilterName,
        },
      },
    }
  }

  if (key === 'any') {
    return {
      type: HANDLE_CLICK_BEDS_FILTER_BUTTON,
      payload: {
        listingsFilters: {
          ...state.listingsFilters,
          currentRange: [],
        },
      },
    }
  }
  const isStudio = key === 'studio'
  const isAny = key === 'any'

  if (!isStudio && !isAny) {
    let keyNum = parseInt(key[key.length - 1], 10)
    const isKeyNumPresent = currentRange.indexOf(keyNum) >= 0
    console.log('keyNum', keyNum)

    const bedsButtons = state.listingsFilters?.bedsButtons.map((bedBtn) => {
      if (keyNum <= bedBtn.value) {
        bedBtn.isActive = true
        return bedBtn
      }
      return bedBtn
    })
    // CONFIRMED - DO NOT CHANGE
    //if a range hasnt been set yet...
    if (!isKeyNumPresent && currentRange.length === 0) {
      const range = [1, 2, 3, 4, 5]
      const startRange = range.indexOf(keyNum)
      const returnRange = range.slice(startRange)

      return handleBedsNumAction(returnRange, bedsButtons, keyNum)
    }

    //a range exists
    if (currentRange.length >= 2) {
      const rangeInReducer = state.listingsFilters?.currentRange
      const lastNumInRangeIdx = state.listingsFilters?.currentRange.length - 1
      const lastValue = state.listingsFilters?.currentRange[lastNumInRangeIdx]
      const firstValue = state.listingsFilters?.currentRange[0]
      const previousBtnClicked = state.listingsFilters?.clickedFilterName

      const range = [1, 2, 3, 4, 5]

      // if the clicked value is less than the lowest range number in the reducer...
      if (keyNum < firstValue) {
        //get the new range of numbers
        const currentRange = range.slice(range.indexOf(keyNum), lastValue)

        return handleBedsNumAction(currentRange, bedsButtons, keyNum)
      }

      // range exists and number in range is clicked
      if (isKeyNumPresent && keyNum > previousBtnClicked) {
        const currentRange = range.slice(
          range.indexOf(previousBtnClicked),
          keyNum
        )

        const deactivateBedButtons = state.listingsFilters?.bedsButtons.map(
          (bedBtn) => {
            // find the bedButtons that corespond to the new range
            if (currentRange.indexOf(bedBtn.value) >= 0) {
              bedBtn.isActive = true
              return bedBtn
            }
            bedBtn.isActive = false
            return bedBtn
          }
        )
        return handleBedsNumAction(currentRange, deactivateBedButtons, keyNum)
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
