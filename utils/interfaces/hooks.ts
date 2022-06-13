import { IinitialState } from 'reducers/interface'

interface IMultiSlug {
  query: string
  value: string
}

export interface IParam {
  id: string
  className?: string
  query?: string | []
  slug?: string | IMultiSlug[]
  props?: {
    [key: string]: any
  }
  isAsc?: boolean
  state?: IinitialState
}

export interface IFilterListingsProps {
  param: IParam
}

export interface IHandleRouteProps {
  state?: IinitialState
  filterListings?: IParam
  sortListings?: IParam
}
