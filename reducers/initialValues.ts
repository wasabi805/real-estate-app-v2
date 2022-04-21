import { IButton, IButtonWithIcon } from 'utils/interfaces/buttons'
import { ISoldDateRangeRows } from 'utils/interfaces/tables'
import { IAntTableSelectedRow } from 'utils/interfaces/antDesign'

/* ------ For SALE RENT SOLD ------*/

export const forSaleRentSoldButtons: IButton[] = [
  { id: 'all-filters-btn-for-sale', text: 'For Sale', size: 'large' },
  { id: 'all-filters-btn-for-rent', text: 'For Rent', size: 'large' },
  { id: 'all-filters-btn-sold', text: 'Sold', size: 'large' },
]

export const soldDateRangeColumns: IAntTableSelectedRow[] = [
  {
    title: 'Sold Date Period',
    dataIndex: 'soldDatePeriod',
  },
]

export const soldDateRangeRows: ISoldDateRangeRows[] = [
  {
    key: 'sold-last-1-week',
    soldDatePeriod: 'Last 1 Week',
  },
  {
    key: 'sold-last-1-month',
    soldDatePeriod: 'Last 1 Month',
  },
  {
    key: 'sold-last-3-months',
    soldDatePeriod: 'Last 3 Months',
  },
  {
    key: 'sold-last-6-months',
    soldDatePeriod: 'Last 6 Months',
  },
  {
    key: 'sold-last-1-year',
    soldDatePeriod: 'Last 1 Year',
  },
  {
    key: 'sold-last-2-years',
    soldDatePeriod: 'Last 2 Years',
  },
  {
    key: 'sold-last-3-years',
    soldDatePeriod: 'Last 3 Years',
  },
  {
    key: 'sold-last-5-years',
    soldDatePeriod: 'Last 5 Years',
  },
]

/* ----- HOME TYPE ----- */

export const homeTypeButtons: IButtonWithIcon[] = [
  {
    id: 'home-type-house',
    text: 'Home',
    onClick: null,
    icon: null,
  },
  {
    id: 'home-type-multiFamily',
    text: 'Multi Family',
    onClick: null,
    icon: null,
  },
  {
    id: 'home-type-condo',
    text: 'condo',
    onClick: null,
    icon: null,
  },
]

/* ----- BEDS BATHS ----- */

interface IBedsButton {
  key: string
  value: string | Number
  isActive: Boolean
}

export const bedsButtons: IBedsButton[] = [
  { key: 'any', value: 'Any', isActive: true },
  { key: 'beds-fltr-1', value: 1, isActive: false },
  { key: 'beds-fltr-2', value: 2, isActive: false },
  { key: 'beds-fltr-3', value: 3, isActive: false },
  { key: 'beds-fltr-4', value: 4, isActive: false },
  { key: 'beds-fltr-5', value: 5, isActive: false },
]

export const newBedsButtons: IBedsButton[] = [
  { id: 'beds-fltr-any', text: 'Any' },
  { id: 'beds-fltr-1', text: 1 },
  { id: 'beds-fltr-2', text: 2 },
  { id: 'beds-fltr-3', text: 3 },
  { id: 'beds-fltr-4', text: 4 },
  { id: 'beds-fltr-5', text: 5 },
]

export const bathButtons = [
  {
    id: 'baths-filter-btn-any',
    text: 'Any',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-one-plus',
    text: '1+',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-one-and-half-plus',
    text: '1.5+',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-two-plus',
    text: '2+',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-two-and-half-plus',
    text: '2.5+',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-three-plus',
    text: '3+',
    onClick: null,
  },
  {
    id: 'baths-filter-btn-four-plus',
    text: '4+',
    onClick: null,
  },
]
