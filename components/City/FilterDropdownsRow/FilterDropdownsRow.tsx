import React from 'react'
import { FilterDropdownsContainer } from '@components/City/FilterDropdownsRow/styles'
import { DropDownMenuButton } from '@components/_common/DropDownMenuButton'
import AllFiltersButton from '@components/City/FilterDropdownsRow/FilterComponents/AllFilters/AllFiltersButton'
import { Select } from 'antd'

import {
  ForSaleRentSold,
  HomeType,
  BedsBaths,
  Price,
} from '@components/City/FilterDropdownsRow/FilterComponents'

const FilterDropdownsRow = () => {
  //  ROW CONTAINING ALL FILTER BUTTONS
  return (
    <FilterDropdownsContainer>
      {/* BUTTON ONE */}
      <DropDownMenuButton
        buttonName={'For Sale'}
        component={<ForSaleRentSold />}
      />

      {/* BUTTON TWO */}
      <DropDownMenuButton buttonName={'Price'} component={<Price />} />

      {/* BUTTON THREE */}
      <DropDownMenuButton buttonName={'Home Type'} component={<HomeType />} />

      {/* BUTTON FOUR */}
      <DropDownMenuButton
        buttonName={'Beds / Baths'}
        component={<BedsBaths />}
      />

      {/* BUTTON FIVE */}
      <AllFiltersButton />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdownsRow
