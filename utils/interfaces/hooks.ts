import { IinitialState } from 'reducers/interface'

interface IMultiSlug {
  query: string
  value: string
}

export interface IParam {
  id?: string
  className?: string
  query?: string | []
  slug?: string | IMultiSlug[]
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
