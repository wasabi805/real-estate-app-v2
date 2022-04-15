import React, { useState } from 'react'
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
    <FilterDropdownsRowStyles>
      <FilterDropdownsContainer>
        {/* BUTTON ONE */}
        <DropdownButton
          className={'ant-btn'}
          btnKey={'1'}
          buttonName={'For Sale'}
          activeKey={activePannel}
          onChange={() => handleSetActivePannel('1')}
          component={<div>Hello</div>}
          buttonStyles={{
            width: '6rem',
          }}
        />

        {/* BUTTON TWO */}
        <DropdownButton
          className={'ant-btn'}
          btnKey={'2'}
          buttonName={'Price'}
          activeKey={activePannel}
          onChange={() => handleSetActivePannel('2')}
          component={<Price />}
          buttonStyles={{
            width: '6rem',
          }}
        />

        {/* BUTTON THREE */}
        <DropdownButton
          className={'ant-btn home-type-content'}
          btnKey={'3'}
          buttonName={'Home-Type'}
          activeKey={activePannel}
          onChange={() => handleSetActivePannel('3')}
          component={<HomeType />}
          buttonStyles={{
            width: '7rem',
          }}
        />

        {/* BUTTON FOUR */}
        <DropdownButton
          className={'ant-btn beds-bath-content'}
          btnKey={'4'}
          buttonName={'Beds / Baths'}
          activeKey={activePannel}
          onChange={() => handleSetActivePannel('4')}
          component={<BedsBaths />}
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
