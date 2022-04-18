import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import {
  FilterDropdownsContainer,
  FilterDropdownsRowStyles,
} from '@components/City/FilterDropdownsRow/styles'

import AllFiltersButton from '@components/City/FilterDropdownsRow/FilterComponents/AllFilters/AllFiltersButton'
import DropdownButton from '@components/_common/DropdownButton'

import {
  ForSaleRentSold,
  HomeType,
  BedsBaths,
  Price,
} from '@components/City/FilterDropdownsRow/FilterComponents'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'
import ButtonComp from '@components/_common/ButtonComp'

const { setActiveFilterPanel } = FilterDropdownsActions

const {
  CLOSE_ALL_PANELS,
  FOR_SALE_PANEL,
  PRICE_PANEL,
  HOME_TYPE_PANEL,
  BEDS_BATH_PANEL,
} = FILTER_DROPDOWNS_PANEL_KEYS

//  ROW CONTAINING ALL FILTER BUTTONS
const FilterDropdownsRow = () => {
  const { state, dispatch } = useContext(AppContext)

  const handleSetActivePanel = (key: string) => {
    if (state.filterDropdownsRow.activeFilterPanel === key) {
      return dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))
    }

    dispatch(setActiveFilterPanel(key))
  }

  const handleClickDone = () => dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))

  const ClearDoneButtons = ({ doneFn }) => (
    <ButtonComp
      instance={{ name: 'button-row' }}
      align="right"
      buttonGroup={[
        {
          text: 'Clear',
          onClick: () => console.log(' Clear clicked'),
        },
        {
          text: 'Done',
          onClick: doneFn,
          type: 'primary',
        },
      ]}
    />
  )

  return (
    <FilterDropdownsRowStyles>
      <FilterDropdownsContainer>
        {/* BUTTON ONE */}
        <DropdownButton
          className={'ant-btn for-sale-filter'}
          btnKey={FOR_SALE_PANEL}
          buttonName={'For Sale'}
          activeKey={state.filterDropdownsRow.activeFilterPanel}
          onChange={() => handleSetActivePanel(FOR_SALE_PANEL)}
          component={
            <>
              <ForSaleRentSold />
              <ClearDoneButtons doneFn={handleClickDone} />
            </>
          }
          buttonStyles={{
            width: '6rem',
          }}
        />

        {/* BUTTON TWO */}
        <DropdownButton
          className={'ant-btn'}
          btnKey={PRICE_PANEL}
          buttonName={'Price'}
          activeKey={state.filterDropdownsRow.activeFilterPanel}
          onChange={() => handleSetActivePanel(PRICE_PANEL)}
          component={
            <>
              <Price />
              <ClearDoneButtons doneFn={handleClickDone} />
            </>
          }
          buttonStyles={{
            width: '6rem',
          }}
        />

        {/* BUTTON THREE */}
        <DropdownButton
          className={'ant-btn home-type-content'}
          btnKey={HOME_TYPE_PANEL}
          buttonName={'Home-Type'}
          activeKey={state.filterDropdownsRow.activeFilterPanel}
          onChange={() => handleSetActivePanel(HOME_TYPE_PANEL)}
          component={
            <>
              <HomeType />
              <ClearDoneButtons doneFn={handleClickDone} />
            </>
          }
          buttonStyles={{
            width: '7rem',
          }}
        />

        {/* BUTTON FOUR */}
        <DropdownButton
          className={'ant-btn beds-bath-content'}
          btnKey={BEDS_BATH_PANEL}
          buttonName={'Beds / Baths'}
          activeKey={state.filterDropdownsRow.activeFilterPanel}
          onChange={() => handleSetActivePanel(BEDS_BATH_PANEL)}
          component={
            <>
              <BedsBaths />
              <ClearDoneButtons doneFn={handleClickDone} />
            </>
          }
          buttonStyles={{
            width: '7.5rem',
          }}
        />

        {/* BUTTON FIVE */}
        <AllFiltersButton />
      </FilterDropdownsContainer>
    </FilterDropdownsRowStyles>
  )
}

export default FilterDropdownsRow
