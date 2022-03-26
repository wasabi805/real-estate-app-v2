import { HANDLE_CLICK_BEDS_FILTER_BUTTON } from '.'

export const range = [1, 2, 3, 4, 5]

export const handleBedsNumAction = (
  state,
  newRange,
  bedsButtons,
  clickedFilterName
) => {
  return {
    type: HANDLE_CLICK_BEDS_FILTER_BUTTON,
    payload: {
      listingsFilters: {
        ...state.listingsFilters,
        currentRange: newRange,
        bedsButtons: bedsButtons,
        clickedFilterName: clickedFilterName,
      },
    },
  }
}

export const setInitialButtonsActive = (state, keyNum: number) => {
  return state.listingsFilters?.bedsButtons.map((bedBtn) => {
    if (keyNum <= bedBtn.value) {
      bedBtn.isActive = true
      return bedBtn
    }
    return bedBtn
  })
}

export const deactivateBedButtons = (state, newRange) => {
  return state.listingsFilters?.bedsButtons.map((bedBtn) => {
    // find the bedButtons that corespond to the new range
    if (newRange.indexOf(bedBtn.value) >= 0) {
      bedBtn.isActive = true
      return bedBtn
    }
    bedBtn.isActive = false
    return bedBtn
  })
}

export const activateBedButtons = (state, keyNum) =>
  state.listingsFilters?.bedsButtons.map((bedBtn) => {
    if (bedBtn.value === keyNum) {
      bedBtn.isActive = true
      return bedBtn
    }
    if (bedBtn.value > keyNum) {
      bedBtn.isActive = false
      return bedBtn
    }
    return bedBtn
  })
