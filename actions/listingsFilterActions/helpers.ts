import { HANDLE_CLICK_BEDS_FILTER_BUTTON } from '.'

export const handleBedsNumAction = (
  state,
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
