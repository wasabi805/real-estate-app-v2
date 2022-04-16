import React from 'react'
import ButtonComp from 'components/_common/ButtonComp'
import House from 'icons/House'
import MultiFamilyHome from 'icons/MultiFamilyHome'
import Condo from 'icons/Condo'

const tileProps = {
  names: ['House', 'Multi Family', 'Condo'],
  width: '20',
  height: '20',
}

const HomeType = () => {
  const { names, width, height } = tileProps

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ButtonComp
          name={names[0]}
          instance={{
            name: 'tile-top-icon',
            icon: <House width={width} height={height} />,
          }}
        />
        <ButtonComp
          name={names[1]}
          instance={{
            name: 'tile-top-icon',
            icon: <MultiFamilyHome width={width} height={height} />,
          }}
        />
        <ButtonComp
          name={names[2]}
          instance={{
            name: 'tile-top-icon',
            icon: <Condo width={width} height={height} />,
          }}
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
