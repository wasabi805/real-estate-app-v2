type TClearBy = () => {}

export interface IfilterCategories {
  sortTab: () => void
  sortTableRow: () => void
  status: () => void
  price: () => void
  homeType: () => void
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
