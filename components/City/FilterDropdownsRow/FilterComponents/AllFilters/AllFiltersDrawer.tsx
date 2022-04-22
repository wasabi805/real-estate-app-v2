import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Drawer } from 'antd'
import 'antd/dist/antd.css'
import {
  AllFiltersDrawerContainer,
  DrawerCotent,
} from 'components/City/FilterDropdownsRow/FilterComponents/AllFilters/styles'
import PriceFilter from '../Price/components/PriceFilter'
import BedsBath from '../BedsBath/BedsBath'
import HomeType from '../HomeType/HomeType'
import ForSaleRentSoldButtons from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/ForSaleRentSoldButtons'
import * as AllFiltersActions from 'actions/ListingsActions/FilterActions/allFiltersActions'
const { setFilterDrawerOpen } = AllFiltersActions

const AllFiltersDrawer = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const handleClose = () => dispatch(setFilterDrawerOpen(false))

  return (
    <AllFiltersDrawerContainer>
      <Drawer
        width={'42rem'}
        placement="right"
        onClose={handleClose}
        visible={state?.listings?.filters?.allFilters?.isDrawerOpen}
      >
        <DrawerCotent>
          {/* ----- FOR SALE FOR RENT SOLD ----- */}
          <div className="all-filters-drawer-row for-sale-rent-sold">
            <ForSaleRentSoldButtons />
          </div>

          {/* ----- PRICE ----- */}
          <div className="all-filters-drawer-row price">
            <h3>Price</h3>
            <PriceFilter />
          </div>

          {/* ----- Beds Bath ----- */}
          <div className="all-filters-drawer-row">
            <BedsBath />
          </div>

          {/* ----- HomeType ----- */}
          <div className="all-filters-drawer-row">
            <HomeType />
          </div>
        </DrawerCotent>
      </Drawer>
    </AllFiltersDrawerContainer>
  )
}

export default AllFiltersDrawer
