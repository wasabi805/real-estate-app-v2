import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
import { CityWrapper } from './styles'
import { MapColumnContainer, ListingsColumnContainer } from './styles'
import Listings from '@pages/city/components/Listings'
import PropertySearchBar from '@components/PropertySeachBar'
import mockMap from 'public/mockMap.jpeg'
import { FilterDropdownsRow } from '@pages/city/components/FilterDropdownsRow'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'

const City = (props) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const router = useRouter()

  useEffect(() => {
    console.log('State Updated', state)
    if (state.searchResults.routeTo !== state.searchResults.prevRoute) {
      const url = state.searchResults.routeTo
      console.log(Object.keys(router))
      router.push(url)
    }
  }, [state.searchResults.routeTo])

  return (
    <CityWrapper>
      <Row>
        <Col>
          <PropertySearchBar />
        </Col>
      </Row>
      <Row>
        <MapColumnContainer span={14}>
          <Image src={mockMap} alt="the-five-kingdoms" />
        </MapColumnContainer>

        <ListingsColumnContainer span={10}>
          <div>
            <h2>Santa Monica Homes For Sale</h2>
          </div>
          <FilterDropdownsRow />
          <Listings />
        </ListingsColumnContainer>
      </Row>
    </CityWrapper>
  )
}

export default City
