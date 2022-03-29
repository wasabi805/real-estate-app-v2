import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import AppContext from 'context/appContext'
import RangedSlider from 'components/common/RangedSlider'
import InputComp from 'components/common/InputComp'
import ButtonComp from 'components/common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import mockHistogram from 'public/mockHistogram.png'
import {
  PriceFilterContainer,
  RangedSliderRow,
  RangedSliderInputsRow,
  PriceSliderButtonContainer,
} from 'components/City/PriceFilters/styles'

const { setMinPriceFilterField, setMaxPriceFilterField } = ListingsFilterActions

const PriceFilter = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  console.log('WHAT IS STATE WHEN UPDATES', state)
  const handleMinPriceField = (value: number) => {
    dispatch(setMinPriceFilterField(value, state))
  }

  const handleMaxPriceField = (value: number) =>
    dispatch(setMaxPriceFilterField(value))

  const getMinMaxFromSliderCb = async(value: number[]) => {
   
    const result = await value[0]
    console.log(result, 'what is result')

    dispatch(setMinPriceFilterField(result , state))
    // dispatch(setMaxPriceFilterField(result[1], state))
  }

  useEffect( ()=>{
    // alert('i loaded')
    console.log('WHAT IS STATE RIGHT NOW', state)
  },[
    state
  ] )
  return (
    <PriceFilterContainer
        moveMin={state.priceFilter?.moveMin}
        onClick={(e) => e.stopPropagation()}>
      <div>
        <Image src={mockHistogram} alt="mockHistogram" />
      </div>

      <RangedSliderRow>
        <RangedSlider
          sliderRange={state.priceFilter?.range}
          changeMinSliderPos={state.priceFilter?.changeMinSliderPos}
          onAfterChange={getMinMaxFromSliderCb}
        />
      </RangedSliderRow>

      <RangedSliderInputsRow onClick={(e) => e.stopPropagation()}>
        {/* MIN PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'min'}
          name={'minField'}
          value={state.priceFilter?.minField}
          onChange={handleMinPriceField}
          size={'small'}
        />{' '}
        -{/* MAX PRICE FIELD */}
        <InputComp
          format={'dollars'}
          placeHolder={'max'}
          name={'maxField'}
          value={state.priceFilter?.maxField}
          onChange={handleMaxPriceField}
          size={'small'}
        />
      </RangedSliderInputsRow>

      <PriceSliderButtonContainer>
        <ButtonComp name={'Clear'} />
        <ButtonComp name={'Done'} type={'primary'} />
      </PriceSliderButtonContainer>
    </PriceFilterContainer>
  )
}

export default PriceFilter
