import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import RadioGroupComp from 'components/_common/RadioGroupComp'

const ForSaleRentSold = () => {
  const { state, dispatch } = useContext(AppContext)

  const handleOnChange = (e) => {
    const { value, checked } = e.target
    console.log('what is e?', { value, checked })
  }

  const tempGroup = [{ name: 'someName', value: 'someValue' }]

  return (
    <RadioGroupComp
      radioButtons={tempGroup}
      className="for-sale-rent-solid-radio-group"
      onChange={handleOnChange}
    ></RadioGroupComp>
  )
}

export default ForSaleRentSold
