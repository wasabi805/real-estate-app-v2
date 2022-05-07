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

const { setFilterCurrentBathsAmount, clearBedsBathsFilters } =
  ListingsFilterActions
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
          props: param?.props,
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
    /* IMPORTANT, any key changes made here should also get updated in in filterBy obj at useRoute hook as well */

    const filterCategory = {
      homeType: () => dispatchAction(setSelectedHomeType(param.className!)),
      status: () => dispatchAction(setFilterByPropertyType([param.className!])), //aka forSaleRentSold
      beds: () => dispatchAction(newSetBedsValues(param)),
      baths: () => {
        console.log(param.className!)
        dispatchAction(setFilterCurrentBathsAmount(param.className!))
      },

      clearData: () => {
        console.log('what is param.props', param.props)
        const { filterCategory } = param.props!

        const clearBy = {
          bedsBaths: () => dispatchAction(clearBedsBathsFilters()),
        }

        return clearBy[filterCategory]()
      },
    }

    const id = param && param?.id
    // run the function to update appReducer, UI changes, and url query changes
    filterCategory[id]()
  }

  return { filterListings }
}

export default useFilterListings
