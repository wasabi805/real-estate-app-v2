import { IButton, IButtonWithIcon } from 'utils/interfaces/buttons'
import { ISoldDateRangeRows } from 'utils/interfaces/tables'
import { IAntTableSelectedRow } from 'utils/interfaces/antDesign'
import {
  bedsNumberIdPrefix,
  bathsValuesPrefix,
  homeTypeIdPrefix,
  soldDateRangeIdPrefix,
  forSaleRentSoldIdPrefix,
} from 'utils/contants'

/*  4-21-2022 REFLOGED BACK TO REFACTOR INITIAL VALUES */
/* ------ For SALE RENT SOLD ------*/

export const forSaleRentSoldButtons: IButton[] = [
  { id: `${forSaleRentSoldIdPrefix}for-sale`, text: 'For Sale', size: 'large' },
  { id: `${forSaleRentSoldIdPrefix}for-rent`, text: 'For Rent', size: 'large' },
  { id: `${forSaleRentSoldIdPrefix}sold`, text: 'Sold', size: 'large' },
]

export const soldDateRangeColumns: IAntTableSelectedRow[] = [
  {
    title: 'Sold Date Period',
    dataIndex: 'soldDatePeriod',
  },
]

export const soldDateRangeRows: ISoldDateRangeRows[] = [
  { key: `${soldDateRangeIdPrefix}1-week`, soldDatePeriod: 'Last 1 Week' },
  { key: `${soldDateRangeIdPrefix}1-month`, soldDatePeriod: 'Last 1 Month' },
  { key: `${soldDateRangeIdPrefix}3-months`, soldDatePeriod: 'Last 3 Months' },
  { key: `${soldDateRangeIdPrefix}6-months`, soldDatePeriod: 'Last 6 Months' },
  { key: `${soldDateRangeIdPrefix}1-year`, soldDatePeriod: 'Last 1 Year' },
  { key: `${soldDateRangeIdPrefix}2-years`, soldDatePeriod: 'Last 2 Years' },
  { key: `${soldDateRangeIdPrefix}3-years`, soldDatePeriod: 'Last 3 Years' },
  { key: `${soldDateRangeIdPrefix}5-years`, soldDatePeriod: 'Last 5 Years' },
]

/* ----- HOME TYPE ----- */

export const homeTypeButtons: IButtonWithIcon[] = [
  {
    id: `${homeTypeIdPrefix}house`,
    text: 'Home',
    onClick: null,
    icon: null,
  },
  {
    id: `${homeTypeIdPrefix}multiFamily`,
    text: 'Multi Family',
    onClick: null,
    icon: null,
  },
  {
    id: `${homeTypeIdPrefix}condo`,
    text: 'condo',
    onClick: null,
    icon: null,
  },
]

/* ----- BEDS BATHS ----- */

export const bedsButtons: IButton[] = [
  { id: `${bedsNumberIdPrefix}any`, text: 'Any' },
  { id: `${bedsNumberIdPrefix}1`, text: 1 },
  { id: `${bedsNumberIdPrefix}2`, text: 2 },
  { id: `${bedsNumberIdPrefix}3`, text: 3 },
  { id: `${bedsNumberIdPrefix}4`, text: 4 },
  { id: `${bedsNumberIdPrefix}5`, text: 5 },
]

export const bedsButtonFilterRange = bedsButtons
  .filter((btn: IButton) => typeof btn.text! === 'number')
  .map((btn: IButton) => btn.text!)

export const bathButtons = [
  { id: `${bathsValuesPrefix}any`, text: 'Any' },
  { id: `${bathsValuesPrefix}one-plus`, text: '1+' },
  { id: `${bathsValuesPrefix}one-and-half-plus`, text: '1.5+' },
  { id: `${bathsValuesPrefix}two-plus`, text: '2+' },
  { id: `${bathsValuesPrefix}two-and-half-plus`, text: '2.5' },
  { id: `${bathsValuesPrefix}three-plus`, text: '3+' },
  { id: `${bathsValuesPrefix}four-plus`, text: '4+' },
]

export const bedsBathsPayload = {
  listings: {
    filters: {
      bedsBaths: {},
    },
  },
}
