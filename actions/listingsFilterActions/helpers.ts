import { HANDLE_CLICK_BEDS_FILTER_BUTTON } from '.'
import { bedsButtons } from 'reducers/initialValues'

export const range = [1, 2, 3, 4, 5]

export const handleBedsNumAction = (
  state,
  newRange,
  bedsButtons,
  clickedFilterName
) => {
  return {
    type: HANDLE_CLICK_BEDS_FILTER_BUTTON,
    // payload: {
    //   listingsFilters: {
    //     ...state.listings,
    //     currentRange: newRange,
    //     bedsButtons: bedsButtons,
    //     clickedFilterName: clickedFilterName,
    //   },
    // },

    payload: {
      listings: {
        ...state.listings,
        currentRange: newRange,
        bedsButtons: bedsButtons,
        clickedFilterName: clickedFilterName,
      },
    },
  }
}

export const setInitialButtonsActive = (state, keyNum: number) => {
  return bedsButtons.map((bedBtn) => {
    if (bedBtn.value === 'Any') {
      bedBtn.isActive = false
      return bedBtn
    }

    if (keyNum <= bedBtn.value) {
      bedBtn.isActive = true
      return bedBtn
    }
    return bedBtn
  })
}

export const deactivateBedButtons = (state, newRange) => {
  console.log('deactivateBedButtons', state, newRange)
  return state.listings?.bedsButtons.map((bedBtn) => {
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
  state.listings?.bedsButtons.map((bedBtn) => {
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

export const setSingleButtonActive = (state, keyNum) =>
  state.listings?.bedsButtons?.map((bedBtn) => {
    bedBtn.value === keyNum
      ? (bedBtn.isActive = true)
      : (bedBtn.isActive = false)
    return bedBtn
  })

export const defineFilterPriceSliderData = (data: []) => {
  //TODO: sort the listings by asscending order
  console.log('what is properties', data.listings)

  return {
    startSlider: '',
    endSlider: '',
  }
}
