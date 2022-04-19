import { IAction } from '../interface'

export const SET_FILTER_BY_PROPERTY_TYPE = 'SET_FILTER_BY_PROPERTY_TYPE'
export const setFilterByPropertyType = (
  propertyType: string[]
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_FILTER_BY_PROPERTY_TYPE,
    payload: {
      listingsFilters: {
        forSaleRentSold: {
          filterBy: propertyType,
        },
      },

      forSaleRentSold: {
        filterBy: propertyType,
      },
    },
  }
}

export const SET_SOLD_DATE_RANGE = 'SET_SOLD_DATE_RANGE'
export const setSoldDateRange = (
  data: any
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_SOLD_DATE_RANGE,
    payload: {
      listingsFilters: {
        forSaleRentSold: {
          soldDateRange: [data],
        },
      },
    },
  }
}
