interface IdictionaryEntry {
  key: string
  value: Number
}

export const SORT_BY_LISTING_CATEGORIES: IdictionaryEntry[] = [
  { key: 'price_raw', value: 'Price' },
  { key: 'beds', value: 'Beds' },
  { key: 'baths', value: 'Baths' },
  { key: 'sqft_raw', value: 'Square Feet' },
  { key: 'calculate_dollar_per_sq_ft', value: '$/Square Feet' },
  { key: 'address_new', value: 'Address' },
  { key: 'calculate_location', value: 'Location' }, //might use neighborhoods for this
]

export interface IfilterButtons {
  id: string
  text: string
}

export interface IfilterButtonsBeds {
  key: string
  value: string | Number
  isActive: Boolean
}

export const LISTINGS_FILTERS_BUTTONS_BEDS: IfilterButtonsBeds[] = [
  { key: 'any', value: 'Any', isActive: true },
  { key: 'beds-fltr-1', value: 1, isActive: false },
  { key: 'beds-fltr-2', value: 2, isActive: false },
  { key: 'beds-fltr-3', value: 3, isActive: false },
  { key: 'beds-fltr-4', value: 4, isActive: false },
  { key: 'beds-fltr-5', value: 5, isActive: false },
]

export const LISTINGS_FILTERS_BUTTONS_BATHS: IfilterButtons[] = [
  {
    id: 'baths-filter-btn-any',
    text: 'Any',
  },
  {
    id: 'baths-filter-btn-one-plus',
    text: '1+',
  },
  {
    id: 'baths-filter-btn-one-and-half-plus',
    text: '1.5+',
  },
  {
    id: 'baths-filter-btn-two-plus',
    text: '2+',
  },
  {
    id: 'baths-filter-btn-two-and-half-plus',
    text: '2.5+',
  },
  {
    id: 'baths-filter-btn-three-plus',
    text: '3+',
  },
  {
    id: 'baths-filter-btn-four-plus',
    text: '4+',
  },
]

export const FILTER_DROPDOWNS_PANEL_KEYS = {
  CLOSE_ALL_PANELS: '0',
  FOR_SALE_PANEL: '1',
  PRICE_PANEL: '2',
  HOME_TYPE_PANEL: '3',
  BEDS_BATH_PANEL: '4',
}

export const PROPERTY_TYPE_TILE_PROPS = {
  width: '20',
  height: '20',
}
