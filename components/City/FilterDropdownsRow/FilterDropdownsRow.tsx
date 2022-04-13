import React from 'react'
import { FilterDropdownsContainer } from '@components/City/FilterDropdownsRow/styles'
import { DropDownMenuButton } from '@components/_common/DropDownMenuButton'
import AllFiltersButton from '@components/City/FilterDropdownsRow/FilterComponents/AllFilters/AllFiltersButton'
import { Select, Collapse } from 'antd'
import DropdownButton from '@components/_common/DropdownButton'

const { Panel } = Collapse

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
      {/* <DropDownMenuButton
        buttonName={'For Sale'}
        component={<ForSaleRentSold />}
      /> */}

      {/* BUTTON TWO */}
      {/* OLD -----------*/}
      {/* <DropDownMenuButton buttonName={'Price'} component={<Price />} /> */}

      {/* NEW */}
      <DropdownButton buttonName={'Price'} component={<Price />} />
      <DropdownButton buttonName={'FooBar'} component={<div> FooBar</div>} />

      {/* BUTTON THREE */}
      {/* <DropDownMenuButton buttonName={'Home Type'} component={<HomeType />} /> */}

      {/* BUTTON FOUR */}
      {/* <DropDownMenuButton
        buttonName={'Beds / Baths'}
        component={<BedsBaths />}
      /> */}

      {/* BUTTON FIVE */}
      {/* <AllFiltersButton /> */}
    </FilterDropdownsContainer>
  )
}

export default FilterDropdownsRow
