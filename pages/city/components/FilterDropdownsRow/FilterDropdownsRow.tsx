import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as FilterActions from 'actions/ListingsActions/FilterActions'

import {
  FilterDropdownsContainer,
  FilterDropdownsRowStyles,
} from '@pages/City/components/FilterDropdownsRow/styles'

import AllFiltersButton from '@pages/City/components/FilterDropdownsRow/FilterComponents/AllFilters/AllFiltersButton'
import DropdownButton from '@components/_common/DropdownButton'

import {
  ForSaleRentSold,
  HomeType,
  BedsBaths,
  Price,
} from '@pages/City/components/FilterDropdownsRow/FilterComponents'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'
import ButtonComp from '@components/_common/ButtonComp'
import useFilterListings from '@hooks/useFilterListings'

const { setActiveFilterPanel } = FilterActions

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
  const { filterListings } = useFilterListings()

  const handleSetActivePanel = (key: string) => {
    if (state.listings.filters.activeFilterPanel === key) {
      return dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))
    }

    dispatch(setActiveFilterPanel(key))
  }

  // const handleClearData = () => {
  //   filterListings({
  //     state: state,
  //     param: {
  //       id: 'bedsBathsclear',
  //       query: 'min-baths',
  //       slug: 'any',
  //     },
  //   })
  // }

  const handleClearData = (param) => {
    filterListings({
      state: state,
      param,
    })
  }

  const handleClickDone = () => dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))

  const ClearDoneButtons = ({ clearFn, doneFn }) => (
    <ButtonComp
      groupType="button-row"
      align="right"
      buttonGroup={[
        {
          text: 'Clear',
          onClick: clearFn,
        },
        {
          text: 'Done',
          onClick: doneFn,
          type: 'primary',
        },
      ]}
    />
  )

  //TODO REFACTOR THIS TO MAP BUTTONS
  return (
    <FilterDropdownsRowStyles>
      <FilterDropdownsContainer>
        {/* BUTTON ONE */}

        <DropdownButton
          className={'ant-btn for-sale-filter'}
          btnKey={FOR_SALE_PANEL}
          buttonName={'For Sale'}
          activeKey={state.listings.filters?.activeFilterPanel}
          onChange={() => handleSetActivePanel(FOR_SALE_PANEL)}
          component={
            <>
              <ForSaleRentSold />
              <ClearDoneButtons
                doneFn={handleClickDone}
                clearFn={() =>
                  handleClearData({
                    id: 'clearData',
                    props: {
                      filterCategory: 'status',
                    },
                  })
                }
              />
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
          activeKey={state.listings.filters?.activeFilterPanel}
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
          activeKey={state.listings.filters?.activeFilterPanel}
          onChange={() => handleSetActivePanel(HOME_TYPE_PANEL)}
          component={
            <>
              <HomeType />
              <ClearDoneButtons
                doneFn={handleClickDone}
                clearFn={() =>
                  handleClearData({
                    id: 'clearData',
                    props: {
                      filterCategory: 'homeType',
                    },
                  })
                }
              />
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
          activeKey={state.listings.filters?.activeFilterPanel}
          onChange={() => handleSetActivePanel(BEDS_BATH_PANEL)}
          component={
            <>
              <BedsBaths />
              <ClearDoneButtons
                clearFn={() =>
                  handleClearData({
                    id: 'clearData',
                    props: {
                      filterCategory: 'bedsBaths',
                      // TODO : use these to remove the url query when clear is clicked
                      query: ['min-beds', 'max-beds', 'min-baths'],
                    },
                  })
                }
                doneFn={handleClickDone}
              />
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

export default React.memo(FilterDropdownsRow)
