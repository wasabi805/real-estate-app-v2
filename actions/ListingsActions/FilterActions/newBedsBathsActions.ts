import { IAction } from 'actions/interface'
export const NEW_SET_BEDS_VALUES = 'NEW_SET_BEDS_VALUES'

export const newSetBedsValues = (data) => {
  return {
    type: NEW_SET_BEDS_VALUES,
    payload: {
      listings: {
        filters: {
          bedsBaths: {
            currentRange: data.props.bedsAmount.currentRange,
            clickedNumber: data.props.bedsAmount.clickedNumber,
          },
        },
      },
    },
  }
}
