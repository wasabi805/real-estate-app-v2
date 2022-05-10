import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
import { CityWrapper } from './styles'
import { MapColumnContainer, ListingsColumnContainer } from './styles'
import Listings from '@components/City/Listings'
import PropertySearchBar from '@components/PropertySeachBar'
import mockMap from 'public/mockMap.jpeg'
import { FilterDropdownsRow } from '@components/City/FilterDropdownsRow'

import { Row, Col } from 'antd'

const CityDetails = (props) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  return (
    <CityWrapper>
      <Row>
        <Col>
          {/* <input placeholder="uncomment this to get back auto search"></input> */}
          {/* <PropertySearchBar /> */}
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

CityDetails.getInitialProps = async ({ query, pathname }) => {
  let data = null

  try {
    data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => json)
  } catch (err) {
    console.log()
  }
  // console.log('what is data', data)
  console.log('what are props??', query, pathname)

  return {
    props: {
      'city-name': '',
      data,
    },
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: ['/city/city-name'],
//     fallback: true, // false or 'blocking'
//   }
// }

export default CityDetails
