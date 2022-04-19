import { IButton, IButtonWithIcon } from '../interfaces/buttons'

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
