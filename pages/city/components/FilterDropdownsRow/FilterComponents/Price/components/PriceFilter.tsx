import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import RangedSlider from '@components/_common/RangedSlider'
import InputComp from '@components/_common/InputComp'

import * as PriceFilterActions from 'actions/ListingsActions/FilterActions/priceActions'

import {
  PriceFilterContainer,
  RangedSliderRow,
  RangedSliderInputsRow,
  PriceSliderButtonContainer,
} from '@pages/city/components/FilterDropdownsRow/FilterComponents/Price/styles'

const { setMinPriceFilterField, setMaxPriceFilterField } = PriceFilterActions

const PriceFilter = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const handleMinPriceField = (value: number) => {
    dispatch(setMinPriceFilterField(value, state))
  }

  const handleMaxPriceField = (value: number) =>
    dispatch(setMaxPriceFilterField(value, state))

  const getMinMaxFromSliderCb = async (value: number[]) => {
    const minResult = await value[0]
    const maxResult = await value[1]

    //ORIGINAL ONLY DELETE IF YOU CAN CONFIRM IT WORKS NOW
    dispatch(setMinPriceFilterField(minResult, state))
    dispatch(setMaxPriceFilterField(maxResult, state))
  }

  return (
    <PriceFilterContainer
      moveMin={state.listings?.filters.price?.slider.moveMin}
      moveMax={state.listings?.filters.price?.slider.moveMax}
    >
      <RangedSliderRow>
        <RangedSlider
          sliderRange={state.listings.filters.price.allPrices}
          onAfterChange={getMinMaxFromSliderCb}
        />
      </RangedSliderRow>

      <RangedSliderInputsRow>
        {/* MIN PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'min'}
          name={'minField'}
          // value={state.priceFilter?.minField}
          value={state.listings?.filters.price.minField}
          onChange={handleMinPriceField}
          size={'middle'}
        />{' '}
        - {/* MAX PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'max'}
          name={'maxField'}
          value={state.listings?.filters.price.maxField}
          onChange={handleMaxPriceField}
          size={'middle'}
        />
      </RangedSliderInputsRow>
    </PriceFilterContainer>
  )
}

export default React.memo(PriceFilter)
