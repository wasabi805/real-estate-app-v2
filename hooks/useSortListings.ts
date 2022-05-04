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
    console.log(data, 'what is data')
    handleRoute({
      sort: data,
    })
  }

  return { sortListings }
}

export default useSortListings
