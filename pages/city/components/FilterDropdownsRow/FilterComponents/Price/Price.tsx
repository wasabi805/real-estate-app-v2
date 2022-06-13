import React from 'react'
import PriceFilter from '@pages/city/components/FilterDropdownsRow/FilterComponents/Price/components/PriceFilter'
import { PriceContainer } from '@pages/city/components/FilterDropdownsRow/FilterComponents/Price/styles'
import PriceHistogram from './components/PriceHistogram'

const Price = () => {
  // THIS IS THE MAIN MENU WRAPPER
  return (
    <PriceContainer>
      {/* TODO : SEE WHY THIS CAUSES A CRASH WHEN PRICE TAB CLICKED */}
      {/* <PriceHistogram /> */}
      <PriceFilter />
    </PriceContainer>
  )
}

export default Price
