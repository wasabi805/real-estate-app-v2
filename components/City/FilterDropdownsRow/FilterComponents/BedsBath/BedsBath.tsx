import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from '@components/City/FilterDropdownsRow/styles'
import ButtonComp from '@components/_common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import { IinitialState } from 'reducers/interface'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'
import { BedsBathButtonContainer } from 'components/City/FilterDropdownsRow/FilterComponents/BedsBath/styles'

const {
  handleClickBedsFilterButton,
  handleClickBathsFilterButton,
  setFilterCurrentBathsAmount,
} = ListingsFilterActions

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const bedsButtonClicked = (key: string, state: IinitialState) => {
    dispatch(handleClickBedsFilterButton(key, state))
  }

  const handleBathsButtonClicked = (key: string) => {
    dispatch(setFilterCurrentBathsAmount(key))
  }

  const { bathButtons, currentBaths } = state.listingsFilters?.bedsBaths

  return (
    <BedBathsContainer>
      <div style={{ display: 'flex' }}>
        <h4> Beds </h4> <span>Tap 2 numbers to select a range</span>
      </div>
      <BedsBathButtonContainer>
        {state.listingsFilters?.bedsButtons?.map((btn) => (
          <ButtonComp
            key={btn.key}
            name={btn.value}
            onClick={() => bedsButtonClicked(btn.key, state)}
            type={btn.isActive ? 'primary' : 'default'}
          />
        ))}
      </BedsBathButtonContainer>

      <div>
        <h4 style={{ display: 'flex' }}> Baths </h4>

        <div>
          <ButtonComp
            activeButton={currentBaths}
            groupType="button-row"
            buttonGroup={bathButtons?.map(
              (btn: { id: string; text: string }) => {
                btn.onClick = () => handleBathsButtonClicked(btn.id)
                return btn
              }
            )}
          />
        </div>
      </div>
    </BedBathsContainer>
  )
}

export default BedsBath
