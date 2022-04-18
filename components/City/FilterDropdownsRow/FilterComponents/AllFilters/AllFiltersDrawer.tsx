import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import { Drawer } from 'antd'
import 'antd/dist/antd.css'
import {
  AllFiltersDrawerContainer,
  DrawerCotent,
} from 'components/City/FilterDropdownsRow/FilterComponents/AllFilters/styles'
import ButtonComp from '@components/_common/ButtonComp'
import PriceFilter from '../Price/components/PriceFilter'
import BedsBath from '../BedsBath/BedsBath'
import HomeType from '../HomeType/HomeType'
const { setFilterDrawerOpen } = ListingsFilterActions

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
        visible={state?.listingsFilters?.isDrawerOpen}
      >
        <DrawerCotent>
          {/* ----- FOR SALE FOR RENT SOLD ----- */}
          <div className="all-filters-drawer-row for-sale-rent-sold">
            <ButtonComp
              instance={{ name: 'button-row' }}
              align="center"
              buttonGroup={[
                {
                  text: 'For Sale',
                  onClick: () => console.log(' Clear clicked'),
                },
                {
                  text: 'For Rent',
                  onClick: () => console.log(' Clear clicked'),
                },
                {
                  text: 'Sold',
                  onClick: () => console.log('placeholder'),
                },
              ]}
            />
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
