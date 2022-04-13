import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { Radio, Select, Collapse } from 'antd'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import { ForSaleRentSoldContainer } from 'components/City/FilterDropdownsRow/FilterComponents/ForSaleRentSold/styles'

const { Panel } = Collapse

const ForSaleRentSold = () => {
  const { state, dispatch } = useContext(AppContext)

  const buttons = state.forSaleRentSold.buttons

  const handleOnChange = (e) => {
    const { value, checked } = e.target
    console.log('what is e?', { value, checked })
  }

  return (
    <ForSaleRentSoldContainer onClick={(e) => e.stopPropagation()}>
      <Radio.Group onChange={handleOnChange}>
        <div>
          <Radio value={'for-sale'}>For Sale</Radio>
        </div>

        <div>
          <Radio value={'for-rent'}>For Rent</Radio>
        </div>

        <div>
          <Radio value={'sold'}>Solid</Radio>
        </div>
      </Radio.Group>
    </ForSaleRentSoldContainer>
  )
}

export default ForSaleRentSold
