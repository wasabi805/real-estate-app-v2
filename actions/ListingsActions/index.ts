import { IAction } from 'actions/interface'

export const HOMES_VIEW_TAB_CLICKED = 'HOMES_VIEW_TAB_CLICKED'
export const homesViewTabClicked = (
  string: string
): Pick<IAction, 'type' | 'payload'> => {
  const isTableView = string === 'Table'
  console.log('what is string', string)

  return {
    type: HOMES_VIEW_TAB_CLICKED,

    payload: {
      listings: {
        isTableView,
      },
    },
  }
}
