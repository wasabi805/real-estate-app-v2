import { IAction } from 'actions/interface'

export const SET_FILTER_CURRENT_BATHS_AMOUNT = 'SET_FILTER_CURRENT_BATHS_AMOUNT'
export const setFilterCurrentBathsAmount = (
  amount: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_FILTER_CURRENT_BATHS_AMOUNT,
    payload: {
      listings: {
        filters: {
          bedsBaths: {
            currentBaths: amount,
          },
        },
      },
    },
  }
}

export const SET_FILTER_BY_PROPERTY_TYPE = 'SET_FILTER_BY_PROPERTY_TYPE'
export const setFilterByPropertyType = (
  propertyType: string[]
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_FILTER_BY_PROPERTY_TYPE,
    payload: {
      forSaleRentSold: {
        filterBy: propertyType,
      },
    },
  }
}

export const CLEAR_BEDS_BATHS_FILTERS = 'CLEAR_BEDS_BATHS_FILTERS'
export const clearBedsBathsFilters = () => {
  return {
    type: CLEAR_BEDS_BATHS_FILTERS,
    payload: {
      listings: {
        filters: {
          bedsBaths: {
            currentBaths: 'baths-filter-btn-any',
            currentRange: ['any'],
          },
        },
      },
    },
  }
}
