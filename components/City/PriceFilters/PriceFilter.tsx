import React, { useContext } from 'react'
import Image from 'next/image'
import AppContext from 'context/appContext'
import RangedSlider from 'components/common/RangedSlider'
import InputComp from 'components/common/InputComp'
import ButtonComp from 'components/common/ButtonComp'
import mockHistogram from 'public/mockHistogram.png'
import {
  PriceFilterContainer,
  RangedSliderRow,
  RangedSliderInputsRow,
  PriceSliderButtonContainer,
} from 'components/City/PriceFilters/styles'

const PriceFilter = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { range } = state.priceFilter

  console.log('is range all good?', range)
  return (
    <PriceFilterContainer onClick={(e) => e.stopPropagation()}>
      <div>
        <Image src={mockHistogram} alt="mockHistogram" />
      </div>

      <RangedSliderRow>
        <RangedSlider sliderRange={range} />
      </RangedSliderRow>

      <RangedSliderInputsRow onClick={(e) => e.stopPropagation()}>
        <InputComp format={'dollars'} placeHolder={'min'} size={'small'} /> -{' '}
        <InputComp format={'dollars'} placeHolder={'max'} size={'small'} />
      </RangedSliderInputsRow>

      <PriceSliderButtonContainer>
        <ButtonComp name={'Clear'} />
        <ButtonComp name={'Done'} type={'primary'} />
      </PriceSliderButtonContainer>
    </PriceFilterContainer>
  )
}

export default PriceFilter
