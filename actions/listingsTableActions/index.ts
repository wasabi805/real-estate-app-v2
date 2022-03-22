import { IAction } from 'actions/interface'
export const SET_CLICKED_ROW = 'SET_CLICKED_ROW'
export const setClickedRow = (
  property_id: string[]
): Pick<IAction, 'type' | 'payload'> => {
  console.log('what is property_id', property_id)
  return {
    type: SET_CLICKED_ROW,
    payload: {
      listingTable: {
        currentHome: property_id,
      },
    },
  }
}
