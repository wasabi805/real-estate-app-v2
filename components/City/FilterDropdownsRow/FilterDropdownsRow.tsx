import React from 'react'
import styled from '@emotion/styled'
import { FilterDropdownsContainer } from '@components/City/FilterDropdownsRow/styles'
import { DropDownMenuButton } from 'components/common/DropDownMenuButton'
import AllFiltersButton from '@components/City/FilterDropdownsRow/FilterComponents/AllFilters/AllFiltersButton'
import SelectDropdown from 'components/common/SelectDropdown'
import {
  ForSaleRentSold,
  Price,
  HomeType,
  BedsBaths,
  AllFilters,
} from '@components/City/FilterDropdownsRow/FilterComponents'

const FilterDropdownsRow = () => {
  return (
    <FilterDropdownsContainer>
      <DropDownMenuButton
        buttonName={'For Sale'}
        component={<ForSaleRentSold />}
      />
      <DropDownMenuButton buttonName={'Price'} component={<Price />} />

      <DropDownMenuButton buttonName={'Home Type'} component={<HomeType />} />

      <DropDownMenuButton
        buttonName={'Beds / Baths'}
        component={<BedsBaths />}
      />

      <AllFiltersButton />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdownsRow
