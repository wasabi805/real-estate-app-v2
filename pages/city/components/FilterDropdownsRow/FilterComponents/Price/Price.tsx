import React from 'react'
import PriceFilter from '@pages/City/components/FilterDropdownsRow/FilterComponents/Price/components/PriceFilter'
import { PriceContainer } from '@pages/City/components/FilterDropdownsRow/FilterComponents/Price/styles'
import PriceHistogram from './components/PriceHistogram'

const Price = () => {
  // THIS IS THE MAIN MENU WRAPPER
  return (
    <PriceContainer>
      <PriceHistogram />
      <PriceFilter />
    </PriceContainer>
  )
}

export default Price
