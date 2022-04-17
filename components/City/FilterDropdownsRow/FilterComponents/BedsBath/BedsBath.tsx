import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from '@components/City/FilterDropdownsRow/styles'
import ButtonComp from '@components/_common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
const { handleClickBedsFilterButton, handleClickBathsFilterButton } =
  ListingsFilterActions
import { IinitialState } from 'reducers/interface'
// export const Beds

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  const bedsButtonClicked = (key: string, state: IinitialState) =>
    dispatch(handleClickBedsFilterButton(key, state))

  const bathsButtonClicked = (key: string) => {
    console.log(key)
  }

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
            onClick: () => console.log(' Done'),
            type: 'primary',
          },
        ]}
      />
    </BedBathsContainer>
  )
}

export default BedsBath
