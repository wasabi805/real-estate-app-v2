import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import useRoute from './useRoute'

const useSortListings = () => {
  const { dispatch } = useContext(AppContext)
  const { handleRoute } = useRoute()

  interface iData {
    param: string
    state: any
  }

  const sortListings = (data: iData) => {
    handleRoute({ sortListings: data })
  }

  return { sortListings }
}

export default useSortListings
