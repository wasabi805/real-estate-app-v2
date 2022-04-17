import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import ButtonComp from 'components/_common/ButtonComp'
import House from 'icons/House'
import MultiFamilyHome from 'icons/MultiFamilyHome'
import Condo from 'icons/Condo'

import {
  FILTER_DROPDOWNS_PANEL_KEYS,
  PROPERTY_TYPE_TILE_PROPS,
} from 'utils/dictionaries'

const HomeType = () => {
  const { dispatch } = useContext(AppContext)
  const { names, width, height } = PROPERTY_TYPE_TILE_PROPS

  const { setActiveFilterPanel } = FilterDropdownsActions
  const { CLOSE_ALL_PANELS } = FILTER_DROPDOWNS_PANEL_KEYS

  const handleClickDone = () => dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))

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

      <ButtonComp
        instance={{ name: 'button-row' }}
        align="right"
        buttonGroup={[
          {
            text: 'Clear',
            onClick: () => console.log(' Clear clicked'),
          },
          {
            text: 'Done',
            onClick: handleClickDone,
            type: 'primary',
          },
        ]}
      />
    </div>
  )
}

export default HomeType
