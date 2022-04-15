import React from 'react'
import ButtonComp from 'components/_common/ButtonComp'
import House from 'icons/House'
import MultiFamilyHome from 'icons/MultiFamilyHome'
import Condo from 'icons/Condo'

const tileDimensions = {
  width: '20',
  height: '20',
}

const HomeType = () => {
  const { width, height } = tileDimensions
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ButtonComp
          instance={{
            name: 'tile-top-icon',
            icon: <House width={width} height={height} />,
          }}
          name={'House'}
        />
        <ButtonComp
          instance={{
            name: 'tile-top-icon',
            icon: <MultiFamilyHome width={width} height={height} />,
          }}
          name={'Multi Family'}
        />
        <ButtonComp
          instance={{
            name: 'tile-top-icon',
            icon: <Condo width={width} height={height} />,
          }}
          name={'Condo'}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonComp name={'Clear'} />
        <ButtonComp name={'Done'} type="primary" />
      </div>
    </div>
  )
}

export default HomeType
