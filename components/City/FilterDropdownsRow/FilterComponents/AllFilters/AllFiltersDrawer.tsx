import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import { Drawer } from 'antd'
import 'antd/dist/antd.css'

const { setFilterDrawerOpen } = ListingsFilterActions

const AllFiltersDrawer = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const handleClose = () => dispatch(setFilterDrawerOpen(false))

  return (
    <>
      <Drawer
        // title="Basic Drawer"
        placement="right"
        onClose={handleClose}
        visible={state?.listingsFilters?.isDrawerOpen}
      >
        <p onClick={() => alert('works')}>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default AllFiltersDrawer
