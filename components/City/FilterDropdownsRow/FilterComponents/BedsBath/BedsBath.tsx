import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { BedBathsContainer } from '@components/City/FilterDropdownsRow/styles'
import ButtonComp from '@components/_common/ButtonComp'
import { IinitialState } from 'reducers/interface'
import { BedsBathButtonContainer } from 'components/City/FilterDropdownsRow/FilterComponents/BedsBath/styles'
import { bedsNumberIdPrefix } from 'utils/contants'
import useFilterListings from '@hooks/useFilterListings'
import { bathsCategory } from 'utils'
import { defineBedsAmount } from 'actions/ListingsActions/FilterActions/helpers'

const BedsBath = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { filterListings } = useFilterListings()

  const handleBedsButtonClicked = (className: string, state: IinitialState) => {
    defineBedsAmount(className, state)

    const { bedsAmount } = defineBedsAmount(className, state)!
    const mappedSlugs = bedsAmount.currentRange.map((amount, idx) => ({
      query: 'beds',
      value: amount,
    }))

    filterListings({
      param: {
        id: 'beds',
        className,
        //TODO add a key for bedsAmount to display in UI and pass bedsAmount as the value
        props: {
          bedsAmount: bedsAmount,
        },
        query: 'beds',
        slug: mappedSlugs,
      },
      state,
    })
  }

  const handleBathsButtonClicked = (className: string) => {
    filterListings({
      param: {
        id: 'baths',
        className,
        query: 'min-baths',
        slug: bathsCategory(className),
      },
      state,
    })
  }

  const { bathButtons, currentBaths, currentRange } =
    state.listings?.filters?.bedsBaths

  const mappedBedButtons = state.listings?.filters?.bedsBaths?.bedsButtons.map(
    (btn) => {
      btn.onClick = () => handleBedsButtonClicked(btn.id, state)
      return btn
    }
  )

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
            (id: string) => `${bedsNumberIdPrefix}` + `${id}`
          )}
        />
      </BedsBathButtonContainer>

      <div>
        <h4 style={{ display: 'flex' }}> Baths </h4>

        {/* TODO USE useFilterListings */}
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
