type TClearBy = () => {}

export interface IfilterCategories {
  sortTab: () => void
  sortTableRow: () => void
  homeType: () => void
  status: () => void
  beds: () => void
  baths: () => void
  clearData: TClearBy
}

export interface IHooksParam {
  param: {
    id: string
    props?: {
      [key: string]: any
    }
  }
}
