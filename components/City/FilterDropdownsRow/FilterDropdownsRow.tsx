import React, { useState } from 'react'
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
  const [activePannel, setActivePannel] = useState('0')
  const handleSetActivePannel = (key) => {
    if (activePannel === key) {
      return setActivePannel('0')
    }
    return setActivePannel(key)
  }

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

      {/* BUTTON ONE */}
      <DropdownButton
        btnKey={'1'}
        buttonName={'For Sale'}
        activeKey={activePannel}
        onChange={() => handleSetActivePannel('1')}
        component={<div>Hello</div>}
      />

      {/* BUTTON TWO */}
      <DropdownButton
        btnKey={'2'}
        buttonName={'Price'}
        activeKey={activePannel}
        onChange={() => handleSetActivePannel('2')}
        component={<Price />}
      />

      {/* BUTTON THREE */}
      <DropdownButton
        btnKey={'3'}
        buttonName={'Home-Type'}
        activeKey={activePannel}
        onChange={() => handleSetActivePannel('3')}
        component={<HomeType />}
      />

      {/* BUTTON FOUR */}
      {/* <DropDownMenuButton
        buttonName={'Beds / Baths'}
        component={<BedsBaths />}
      /> */}
      <DropdownButton
        btnKey={'4'}
        buttonName={'Beds / Baths'}
        activeKey={activePannel}
        onChange={() => handleSetActivePannel('4')}
        component={<BedsBaths />}
      />

      {/* BUTTON FIVE */}
      <AllFiltersButton />
    </FilterDropdownsContainer>
  )
}

export default FilterDropdownsRow
