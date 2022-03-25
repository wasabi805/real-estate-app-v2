interface IdictionaryEntry {
  key: string
  value: string
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

export interface IfilterButtons extends IdictionaryEntry {
  isActive: boolean
}

export const LISTINGS_FILTERS_BUTTONS_BEDS: IfilterButtons[] = [
  { key: 'any', value: 'Any', isActive: false },
  { key: 'studio', value: 'Studio', isActive: false },
  { key: 'one', value: '1', isActive: false },
  { key: 'two', value: '2', isActive: false },
  { key: 'three', value: '3', isActive: false },
  { key: 'four', value: '4', isActive: false },
  { key: 'five', value: '5+', isActive: false },
]

export const LISTINGS_FILTERS_BUTTONS_BATHS: IfilterButtons[] = [
  { key: 'any', value: 'Any', isActive: false },
  { key: 'one', value: '1+', isActive: false },
  { key: 'one-point-five', value: '1.5+', isActive: false },
  { key: 'two', value: '2+', isActive: false },
  { key: 'two-point-five', value: '2.5+', isActive: false },
  { key: 'three', value: '3+', isActive: false },
  { key: 'four', value: '4+', isActive: false },
]
