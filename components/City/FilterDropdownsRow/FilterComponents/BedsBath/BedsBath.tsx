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
            activeButton={state.listingsFilters?.bedsBaths.currentBaths}
            groupType="button-row"
            buttonGroup={[
              {
                id: 'baths-filter-btn-any',
                text: 'Any',
                onClick: () => handleBathsButtonClicked('baths-filter-btn-any'),
              },
              {
                id: 'baths-filter-btn-one-plus',
                text: '1+',
                onClick: () =>
                  handleBathsButtonClicked('baths-filter-btn-one-plus'),
              },
              {
                id: 'baths-filter-btn-one-and-half-plus',
                text: '1.5+',
                onClick: () =>
                  handleBathsButtonClicked(
                    'baths-filter-btn-one-and-half-plus'
                  ),
              },
              {
                id: 'baths-filter-btn-two-plus',
                text: '2+',
                onClick: () =>
                  handleBathsButtonClicked('baths-filter-btn-two-plus'),
              },
              {
                id: 'baths-filter-btn-two-and-half-plus',
                text: '2.5+',
                onClick: () =>
                  handleBathsButtonClicked(
                    'baths-filter-btn-two-and-half-plus'
                  ),
              },
              {
                id: 'baths-filter-btn-three-plus',
                text: '3+',
                onClick: () =>
                  handleBathsButtonClicked('baths-filter-btn-three-plus'),
              },
              {
                id: 'baths-filter-btn-four-plus',
                text: '4+',
                onClick: () =>
                  handleBathsButtonClicked('baths-filter-btn-four-plus'),
              },
            ]}
          />
        </div>
      </div>
    </BedBathsContainer>
  )
}

export default BedsBath
