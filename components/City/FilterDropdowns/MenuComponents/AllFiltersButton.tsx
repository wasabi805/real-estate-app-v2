import React, { useContext } from 'react'
import { Button } from 'antd'
import AppContext from 'context/appContext'
import * as ListingsFilterActions from 'actions/listingsFilterActions'

const { setFilterDrawerOpen } = ListingsFilterActions

const AllFilters = () => {
  const appContext = useContext(AppContext)
  const { dispatch } = appContext

  const handleOpenListingsFilterDrawer = () =>
    dispatch(setFilterDrawerOpen(true))

  return <Button onClick={handleOpenListingsFilterDrawer}>All Filters</Button>
}

export default AllFilters
