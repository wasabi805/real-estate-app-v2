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

const CityDetails = ({todo}) => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext

  console.log('what is todo', todo)
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

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${context.params.id}`
  );
  const todo = await res.json();
  console.log('context in getServerSideProps', context)

  return {
    props: {
      todo,
    },
  };
};

export default CityDetails
