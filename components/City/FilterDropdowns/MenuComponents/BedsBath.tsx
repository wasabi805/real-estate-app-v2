import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from 'components/City/FilterDropdowns/styles'
import ButtonComp from 'components/common/ButtonComp'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
const { handleClickBedsFilterButton, handleClickBathsFilterButton } =
  ListingsFilterActions
import { IinitialState } from 'reducers/interface'
// export const Beds

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  console.log('what is listingsFilters', state.listingsFilters?.bedsButtons)

  const bedsButtonClicked = (name: string, state: IinitialState) =>
    dispatch(handleClickBedsFilterButton(name, state))

  const bathsButtonClicked = (name: string) => {
    console.log(name)
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
            onClick={() => bedsButtonClicked(btn.value, state)}
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
            />
          ))}
        </div>
      </div>
    </BedBathsContainer>
  )
}

export default BedsBath
