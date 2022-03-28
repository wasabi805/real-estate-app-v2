import React from 'react'
import Image from 'next/image'
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
  return (
    <PriceFilterContainer onClick={(e) => e.stopPropagation()}>
      <div>
        <Image src={mockHistogram} alt="mockHistogram" />
      </div>

      <RangedSliderRow>
        <RangedSlider />
      </RangedSliderRow>

      <RangedSliderInputsRow onClick={(e) => e.stopPropagation()}>
        <InputComp placeHolder={'min'} /> - <InputComp placeHolder={'max'} />
      </RangedSliderInputsRow>

      <PriceSliderButtonContainer>
        <ButtonComp name={'Clear'} />
        <ButtonComp name={'Done'} type={'primary'} />
      </PriceSliderButtonContainer>
    </PriceFilterContainer>
  )
}

export default PriceFilter
