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

  const handleHomeTypeButtonClick = (id) => {
    console.log('what is id', id)
    dispatch(setSelectedHomeType(id))
  }

  return (
    <HomeTypeButtonsContainer>
      <ButtonComp
        activeButton={state.homeType?.selected}
        groupType={'tile-top-icon'}
        buttonGroup={[
          {
            id: 'home-type-house',
            text: 'Home',
            icon: <House width={width} height={height} />,
            onClick: () => handleHomeTypeButtonClick('home-type-house'),
          },
          {
            id: 'home-type-multi-family',
            text: 'Multi Family',
            icon: <MultiFamilyHome width={width} height={height} />,
            onClick: () => handleHomeTypeButtonClick('home-type-multi-family'),
          },
          {
            id: 'home-type-condo',
            text: 'condo',
            icon: <Condo width={width} height={height} />,
            onClick: () => handleHomeTypeButtonClick('home-type-condo'),
          },
        ]}
      />
    </HomeTypeButtonsContainer>
  )
}

export default HomeType
