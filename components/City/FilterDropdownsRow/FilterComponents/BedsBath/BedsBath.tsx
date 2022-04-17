import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from '@components/City/FilterDropdownsRow/styles'
import ButtonComp from '@components/_common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import * as FilterDropdownsActions from 'actions/filterDropdownsActions'
import { IinitialState } from 'reducers/interface'
import { FILTER_DROPDOWNS_PANEL_KEYS } from 'utils/dictionaries'

const { handleClickBedsFilterButton, handleClickBathsFilterButton } =
  ListingsFilterActions
const { setActiveFilterPanel } = FilterDropdownsActions
const { CLOSE_ALL_PANELS } = FILTER_DROPDOWNS_PANEL_KEYS

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const bedsButtonClicked = (key: string, state: IinitialState) =>
    dispatch(handleClickBedsFilterButton(key, state))

  const bathsButtonClicked = (key: string) => {
    console.log(key)
  }

  const handleClickDone = () =>
    dispatch(setActiveFilterPanel(CLOSE_ALL_PANELS))

  return (
    <BedBathsContainer>
      <div>
        <h3> Beds </h3> <span>Tap 2 numbers to select a range</span>
      </div>
      <div>
        {state.listingsFilters?.bedsButtons?.map((btn) => (
          <ButtonComp
            key={btn.key}
            name={btn.value}
            onClick={() => bedsButtonClicked(btn.key, state)}
            type={btn.isActive ? 'primary' : 'default'}
          />
        ))}
      </div>

      <div>
        <h3> Baths </h3>
        <div>
          {state.listingsFilters?.bathsButtons?.map((btn) => (
            <ButtonComp
              key={btn.key}
              name={btn.value}
              onClick={() => bathsButtonClicked(btn.value)}
              type={btn.isActive ? 'primary' : 'default'}
            />
          ))}
        </div>
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
    </BedBathsContainer>
  )
}

export default BedsBath
