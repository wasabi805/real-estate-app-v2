import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
import useRoute from './useRoute'
import { IFilterListingsProps } from 'utils/interfaces/hooks'
const { setFilterByPropertyType, setSoldDateRange } = ForSaleRentSoldActions
const { setSelectedHomeType } = HomeTypeActions

const useFilterListings = () => {
  const { dispatch } = useContext(AppContext)
  const { handleRoute } = useRoute()

  const filterListings = ({ param, state }: IFilterListingsProps): void => {
    const updateUrl = (): void => {
      handleRoute({
        state: state,
        filterListings: {
          id: param.id,
          className: param.className,
          query: param.query,
          slug: param.slug,
        },
      })
    }
    /**  updateUrl() does what it says and dispatches updates the UI */
    switch (param.id) {
      case 'homeType':
        updateUrl()
        dispatch(setSelectedHomeType(param.className))
        break

      case 'forSaleRentSold':
        updateUrl()
        dispatch(setFilterByPropertyType([param.className]))
        break

      default:
        return
    }
  }

  return { filterListings }
}

export default useFilterListings
