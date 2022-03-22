import { IAction } from 'actions/interface'

export const HOMES_VIEW_TAB_CLICKED = 'HOMES_VIEW_TAB_CLICKED'
export const homesViewTabClicked = (
  string: string
): Pick<IAction, 'type' | 'payload'> => {
  const isTableView = string === 'Table'

  return {
    type: HOMES_VIEW_TAB_CLICKED,
    payload: {
      listingTable: {
        isTableView,
      },
    },
  }
}
