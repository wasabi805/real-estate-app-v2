import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import useRoute from './useRoute'
import { IinitialState } from 'reducers/interface'
import * as ListingsSortActions from 'actions/ListingsActions/SortActions'

const { setActiveSortCategory, setIsAscending } = ListingsSortActions

const useSortListings = () => {
  const { dispatch } = useContext(AppContext)
  const { handleRoute } = useRoute()

  interface iData {
    param: {
      isAsc?: boolean
      slug?: string
      query?: string
    }
    state?: IinitialState
  }

  const sortListings = ({ param, state }) => {
    switch (param.id) {
      case 'ascend-descend-listings':
        handleRoute({
          state: state,
          sortListings: {
            id: 'sort',
            query: `sort=${param.isAsc ? 'low' : 'high'}`,
            slug: state.listings.sort.criteria,
          },
        })
        dispatch(setIsAscending(param.isAsc, state))
        return

      case 'sort-list':
        const isLowOrHigh = (status: boolean | null) => {
          if (status === null || status === undefined) {
            return 'high'
          }
          return state.listings.sort.isAscending ? 'low' : 'high'
        }

        handleRoute({
          state: state,
          sortListings: {
            id: 'sort',
            query: `sort=${isLowOrHigh(state.listings.sort.isAscending)}`,
            slug: param.slug,
          },
        })
        dispatch(setActiveSortCategory(param.slug, state))
        return

      default:
        return
    }
  }
  return { sortListings }
}

export default useSortListings
