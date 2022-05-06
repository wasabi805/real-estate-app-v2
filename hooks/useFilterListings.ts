import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as ForSaleRentSoldActions from 'actions/ListingsActions/FilterActions/forSaleRentSoldActions'
import * as HomeTypeActions from 'actions/ListingsActions/FilterActions/homeTypeActions'
import * as ListingsFilterActions from 'actions/ListingsActions/FilterActions/bedsBathsActions'
import * as NewBedsBathsActions from 'actions/ListingsActions/FilterActions/newBedsBathsActions'
import useRoute from './useRoute'
import { IFilterListingsProps } from 'utils/interfaces/hooks'
const { setFilterByPropertyType } = ForSaleRentSoldActions
const { setSelectedHomeType } = HomeTypeActions

const { setFilterCurrentBathsAmount } = ListingsFilterActions
const { newSetBedsValues } = NewBedsBathsActions

const useFilterListings = () => {
  const { dispatch } = useContext(AppContext)
  const { handleRoute } = useRoute()

  const filterListings = ({ param, state }: IFilterListingsProps): void => {
    //changes url according the changes made in the UI and updates to appReducer
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

    // Updates changes in the UI and appReducer
    const dispatchAction = (action: any) => {
      updateUrl(), dispatch(action)
    }

    // dictionary of functions based in filter type to update appReducer, UI changes, and url query changes
    const filterCategory = {
      homeType: () => dispatchAction(setSelectedHomeType(param.className!)),
      status: () => dispatchAction(setFilterByPropertyType([param.className!])), //aka forSaleRentSold
      beds: () => dispatchAction(newSetBedsValues(param)),
      baths: () =>
        dispatchAction(setFilterCurrentBathsAmount(param.className!)),
      'baths-baths-clear': () => {},
    }

    const id = param && param?.id

    // run the function to update appReducer, UI changes, and url query changes
    filterCategory[id]()

    /**  updateUrl() does what it says and dispatches updates the UI */
    // switch (param.id) {
    //   case 'homeType':
    //     updateUrl()
    //     dispatch(setSelectedHomeType(param.className!))
    //     return

    //   case 'status': //aka forSaleRentSold
    //     updateUrl()
    //     dispatch(setFilterByPropertyType([param.className!]))
    //     return

    //   case 'beds':
    //     updateUrl()
    //     dispatch(newSetBedsValues(param))
    //     return

    //   case 'baths':
    //     updateUrl()
    //     dispatch(setFilterCurrentBathsAmount(param.className!))
    //     return

    //   case 'baths-baths-clear':
    //     alert('staring the work')
    //     console.log({ param, state })
    //     return

    //   default:
    //     return
    // }
  }

  return { filterListings }
}

export default useFilterListings
