import React, { useContext } from 'react'
import { Button } from 'antd'
import AppContext from 'context/appContext'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'
const { setActiveFilterPanel } = FilterDropdownsActions
const { setFilterDrawerOpen } = ListingsFilterActions
const { CLOSE_ALL_PANELS } = FILTER_DROPDOWNS_PANEL_KEYS

const AllFilters = () => {
  const appContext = useContext(AppContext)
  const { dispatch } = appContext

  const handleOpenListingsFilterDrawer = () => {
    dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))
    dispatch(setFilterDrawerOpen(true))
  }

  return <Button onClick={handleOpenListingsFilterDrawer}>All Filters</Button>
}

export default AllFilters
