import React, { useContext } from 'react'
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

  const handleMinPriceField = (value: number) =>
    dispatch(setMinPriceFilterField(value))

  const handleMaxPriceField = (value: number) =>
    dispatch(setMaxPriceFilterField(value))

  const getMinMaxFromSliderCb=(value: number[])=>{
    dispatch(setMinPriceFilterField(value[0]))
    dispatch(setMaxPriceFilterField(value[1]))
  }

  return (
    <PriceFilterContainer onClick={(e) => e.stopPropagation()}>
      <div>
        <Image src={mockHistogram} alt="mockHistogram" />
      </div>

      <RangedSliderRow>
        <RangedSlider 
        sliderRange={state.priceFilter?.range}
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
