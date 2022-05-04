import { IinitialState } from 'reducers/interface'

export interface IParam {
  id?: string
  className?: string
  query?: string
  slug?: string
  isAsc?: boolean
}

export interface IFilterListingsProps {
  param: IParam
  state: IinitialState
}

export interface IHandleRouteProps {
  state?: IinitialState
  filterListings?: IParam
  sortListings?: IParam
}
