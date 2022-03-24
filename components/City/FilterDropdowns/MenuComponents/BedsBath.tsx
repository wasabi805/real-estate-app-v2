import React from 'react'
import { BedBathsContainer } from 'components/City/FilterDropdowns/styles'
import ButtonComp from 'components/common/ButtonComp'

// export const Beds

const BedsBath = () => {
  return (
    <BedBathsContainer>
      <div>
        <h3> Beds </h3> <span>Tap 2 numbers to select a range</span>
      </div>
      <div>
        <ButtonComp name={'Any'} onClick={() => console.log('i was Clicked')} />
        <ButtonComp name={'Studio'} />
        <ButtonComp name={'1'} />
        <ButtonComp name={'2'} />
        <ButtonComp name={'3'} />
        <ButtonComp name={'4'} />
        <ButtonComp name={'5+'} />
      </div>

      <div>
        <h3> Baths </h3>
        <div>
          <ButtonComp name={'Any'} />
          <ButtonComp name={'1+'} />
          <ButtonComp name={'1.5+'} />
          <ButtonComp name={'2+'} />
          <ButtonComp name={'2.5+'} />
          <ButtonComp name={'3+'} />
          <ButtonComp name={'4+'} />
        </div>
      </div>
    </BedBathsContainer>
  )
}

export default BedsBath
