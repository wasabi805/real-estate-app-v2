import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import ButtonComp from 'components/_common/ButtonComp'
import House from 'icons/House'
import MultiFamilyHome from 'icons/MultiFamilyHome'
import Condo from 'icons/Condo'
import { HomeTypeButtonsContainer } from 'components/City/FilterDropdownsRow/FilterComponents/HomeType/styles'

import {
  FILTER_DROPDOWNS_PANEL_KEYS,
  PROPERTY_TYPE_TILE_PROPS,
} from 'utils/dictionaries'

const { setSelectedHomeType } = FilterDropdownsActions

const HomeType = () => {
  const { state, dispatch } = useContext(AppContext)
  const { names, width, height } = PROPERTY_TYPE_TILE_PROPS

  const handleHomeTypeButtonClick = (e) => {
    console.log('what is e', e)
  }

  return (
    <HomeTypeButtonsContainer>
      <ButtonComp
        name={names[0]}
        instance={{
          name: 'tile-top-icon',
          icon: <House width={width} height={height} />,
          onClick: handleHomeTypeButtonClick,
          type: '',
        }}
      />
      <ButtonComp
        name={names[1]}
        instance={{
          name: 'tile-top-icon',
          icon: <MultiFamilyHome width={width} height={height} />,
          onClick: handleHomeTypeButtonClick,
          type: '',
        }}
      />
      <ButtonComp
        name={names[2]}
        instance={{
          name: 'tile-top-icon',
          icon: <Condo width={width} height={height} />,
          onClick: handleHomeTypeButtonClick,
          type: '',
        }}
      />
    </HomeTypeButtonsContainer>
  )
}

export default HomeType
