import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import Image from 'next/image'
import 'antd/dist/antd.css'
import { CityWrapper } from './styles'
import { MapColumnContainer, ListingsColumnContainer } from './styles'
import Listings from 'pages/city/components/Listings'
import PropertySearchBar from '@components/PropertySeachBar'
import mockMap from 'public/mockMap.jpeg'
import { FilterDropdownsRow } from '@pages/city/components/FilterDropdownsRow'

import { Row, Col } from 'antd'

const CityDetails = (props) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  useEffect(() => {
    console.log('did they make it?', props)
  }, [props])

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

// export const getServerSideProps = async (props) => {
//   let data = null

//   const { params, query } = props

//   console.log({ params, query }, 'YEEE')

//   try {
//     data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then((response) => response.json())
//       .then((json) => json)
//   } catch (err) {
//     console.log()
//   }

//   return {
//     props: {
//       params,
//       query,
//     },
//   }
// }

// export async function getStaticPaths() {
//   return {
//     // paths: ['/city/city-name' ,'/city/city-name/filters'],
//     paths: ['/city/params'],
//     fallback: true, // false or 'blocking'
//   }
// }

export default React.memo(CityDetails)
