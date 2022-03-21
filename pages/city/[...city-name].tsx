import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
import { CityWrapper } from './styles'
import { MapColumnContainer, ListingsColumnContainer } from './styles'
import Listings from '@components/City/Listings'
import PropertySearchBar from '@components/PropertySeachBar'
import mockMap from '../../public/mockMap.jpeg'

import { Row, Col } from 'antd'

const CityDetails = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  useEffect(() => {
    console.log('CITY PAGE LOADED', state)
  }, [])

  return (
    <CityWrapper>
      <Row>
        <Col>
          <input placeholder="uncomment this to get back auto search"></input>
          {/* <PropertySearchBar /> */}
        </Col>
      </Row>
      <Row>
        <MapColumnContainer span={14}>
          <Image src={mockMap} alt="the-five-kingdoms" />
        </MapColumnContainer>

        <ListingsColumnContainer span={10}>
          <Row>
            <h3>Santa Monica Homes For Sale</h3>
          </Row>
          <Row> Search Filters live here</Row>
          <Listings />
        </ListingsColumnContainer>
      </Row>
    </CityWrapper>
  )
}

export default CityDetails
