import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
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
    <div className={'city-wrapper'}>
      <Row>
        <Col>
          <PropertySearchBar />
        </Col>
      </Row>
      <Row>
        <Col span={14} style={{ border: '2px solid orange' }}>
          <Image src={mockMap} alt="the-five-kingdoms" />
        </Col>
        <Col span={10} style={{ border: '2px solid plum' }}>
          <Row>
            <h3>Santa Monica Homes For Sale</h3>
          </Row>
          <Row> Search Filters live here</Row>

          <Listings />
        </Col>
      </Row>
    </div>
  )
}

export default CityDetails
