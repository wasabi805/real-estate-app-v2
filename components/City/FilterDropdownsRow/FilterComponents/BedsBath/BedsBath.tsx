import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from '@components/City/FilterDropdownsRow/styles'
import ButtonComp from '@components/_common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import { IinitialState } from 'reducers/interface'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'
import { BedsBathButtonContainer } from 'components/City/FilterDropdownsRow/FilterComponents/BedsBath/styles'
import { bedsNumberPrefix } from 'utils/contants'

const { setBedsValues, setFilterCurrentBathsAmount } = ListingsFilterActions

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const handleBedsButtonClicked = (key: string, state: IinitialState) => {
    dispatch(setBedsValues(key, state))
  }

  const handleBathsButtonClicked = (key: string) => {
    dispatch(setFilterCurrentBathsAmount(key))
  }

  const {
    newBedsButtons,
    bathButtons,
    currentBaths,
    currentRange,
    clickedNumber,
  } = state.listings?.filters?.bedsBaths

  console.log(
    'state.listings?.filters?.bedsBaths back at component',
    state.listings?.filters?.bedsBaths
  )

  const mappedBedButtons =
    state.listings?.filters?.bedsBaths?.newBedsButtons.map((btn) => {
      btn.onClick = () => handleBedsButtonClicked(btn.id, state)
      return btn
    })

  return (
    <BedBathsContainer>
      <div style={{ display: 'flex' }}>
        <h4> Beds </h4> <span>Tap 2 numbers to select a range</span>
      </div>

      <BedsBathButtonContainer>
        <ButtonComp
          groupType="button-row"
          buttonGroup={mappedBedButtons}
          activeButton={currentRange.map(
            (id: string) => `${bedsNumberPrefix}` + `${id}`
          )}
        />
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
