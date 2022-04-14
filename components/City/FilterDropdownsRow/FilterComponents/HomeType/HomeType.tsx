import React from 'react'
import ButtonComp from 'components/_common/ButtonComp'

const HomeType = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ButtonComp name={'Single Family'} />
        <ButtonComp name={'Multi Family'} />
        <ButtonComp name={'Condo'} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonComp name={'Clear'} />
        <ButtonComp name={'Done'} />
      </div>
    </div>
  )
}

export default HomeType
