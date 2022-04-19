import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import RangedSlider from '@components/_common/RangedSlider'
import InputComp from '@components/_common/InputComp'

import * as ListingsFilterActions from 'actions/listingsFilterActions'

import {
  PriceFilterContainer,
  RangedSliderRow,
  RangedSliderInputsRow,
  PriceSliderButtonContainer,
} from '@components/City/FilterDropdownsRow/FilterComponents/Price/styles'

const { setMinPriceFilterField, setMaxPriceFilterField } = ListingsFilterActions

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

    //TODO : step 1 start here : change where this updates in reducer
    dispatch(setMinPriceFilterField(minResult, state))
    dispatch(setMaxPriceFilterField(maxResult, state))
  }

  return (
    <PriceFilterContainer
      moveMin={state.priceFilter?.moveMin}
      moveMax={state.priceFilter?.moveMax}
    >
      <RangedSliderRow>
        <RangedSlider
          sliderRange={state.priceFilter?.range}
          onAfterChange={getMinMaxFromSliderCb}
        />
      </RangedSliderRow>

      <RangedSliderInputsRow>
        {/* MIN PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'min'}
          name={'minField'}
          value={state.priceFilter?.minField}
          onChange={handleMinPriceField}
          size={'middle'}
        />{' '}
        - {/* MAX PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'max'}
          name={'maxField'}
          value={state.priceFilter?.maxField}
          onChange={handleMaxPriceField}
          size={'middle'}
        />
      </RangedSliderInputsRow>
    </PriceFilterContainer>
  )
}

export default PriceFilter
