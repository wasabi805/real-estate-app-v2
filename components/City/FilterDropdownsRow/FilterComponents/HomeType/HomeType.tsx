import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import * as HomeTypeActions from 'actions/listingsFilterActions/homeTypeActions'
import ButtonComp from 'components/_common/ButtonComp'
import House from 'icons/House'
import MultiFamilyHome from 'icons/MultiFamilyHome'
import Condo from 'icons/Condo'
import { HomeTypeButtonsContainer } from 'components/City/FilterDropdownsRow/FilterComponents/HomeType/styles'

import { PROPERTY_TYPE_TILE_PROPS } from 'utils/dictionaries'
import { IButton } from 'utils/interfaces/buttons'

const { setSelectedHomeType } = HomeTypeActions

const HomeType = () => {
  const { state, dispatch } = useContext(AppContext)
  const { width, height } = PROPERTY_TYPE_TILE_PROPS

  const handleHomeTypeButtonClick = (id: string) => {
    dispatch(setSelectedHomeType(id))
  }

  const homeTypeButtons = state.listings?.filters?.homeType?.homeTypeButtons
  const selectedButton = state.listings?.filters?.homeType?.selected

  /* Remaps button props from state and adds onClick and icons to buttons */
  const buttonGroup = homeTypeButtons?.map((btn: IButton) => {
    const iconType = btn.id?.split('-')
    const iconName = iconType && iconType[iconType.length - 1]

    let icon
    switch (iconName) {
      case 'house':
        icon = <House width={width} height={height} />
        break

      case 'multiFamily':
        icon = <MultiFamilyHome width={width} height={height} />
        break

      case 'condo':
        icon = <Condo width={width} height={height} />
        break

      default:
        icon = null
    }

    btn.onClick = () => handleHomeTypeButtonClick(btn.id!)
    btn.icon = icon

    return btn
  })
  
  return (
    <HomeTypeButtonsContainer>
      <ButtonComp
        activeButton={selectedButton}
        groupType={'tile-top-icon'}
        buttonGroup={buttonGroup}
      />
    </HomeTypeButtonsContainer>
  )
}

export default HomeType
