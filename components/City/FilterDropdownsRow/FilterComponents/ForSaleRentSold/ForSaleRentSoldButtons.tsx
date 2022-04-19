import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import ButtonComp from '@components/_common/ButtonComp'
import * as ForSaleRentSoldActions from 'actions/listingsFilterActions/forSaleRentSoldActions'

const { setFilterByPropertyType } = ForSaleRentSoldActions

const ForSaleRentSoldButtons = () => {
  const { state, dispatch } = useContext(AppContext)
  const handleClickListingClass = (id: string[]) =>
    dispatch(setFilterByPropertyType(id))

  const { buttons} = state.listingsFilters?.forSaleRentSold
  const buttonGroup = buttons.map( (btn)=>{
      btn.onClick = ()=> handleClickListingClass(btn.id)
      return btn
  })

  return (
    <ButtonComp
      activeButton={state.listingsFilters?.forSaleRentSold?.filterBy}
      groupType="button-row"
      instance={{ name: 'button-row' }}
      align="center"
      buttonStyle={{ width: '12rem' }}
      buttonGroup={buttonGroup}
    />
  )
}

export default ForSaleRentSoldButtons
