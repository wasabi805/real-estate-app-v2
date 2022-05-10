type TClearBy = () => {}

export interface IfilterCategories {
  homeType: () => void
  status: () => void
  beds: () => void
  baths: () => void
  clearData: TClearBy
}
