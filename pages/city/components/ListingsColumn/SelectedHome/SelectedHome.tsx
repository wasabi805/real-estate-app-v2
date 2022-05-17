import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import fullHouse from 'public/fullHouse.jpg'
import AppContext from 'context/appContext'
import { SelectedHomesContainer } from '@pages/city/components/styles'
import { ListingsTableHeader } from '@pages/city/components/ListingsColumn/ListingsTable/styles'

import { Row, Col, Table } from 'antd'

const SelectedHome = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, listingTable } = state

  const allHomes = searchResults.data.props.listings

  const selectedHome = allHomes.filter(
    (home) => state.listings.currentHome[0] === home.property_id
  )

  return (
    <>
      {state.listings.isTableView && (
        <SelectedHomesContainer>
          <Row>
            <Col span={12}>
              <img
                alt="selected-home"
                src={selectedHome[0].photo}
                style={{ width: '100%' }}
              />
            </Col>

            <Col span={12}>house data</Col>
          </Row>

          <ListingsTableHeader />
        </SelectedHomesContainer>
      )}
    </>
  )
}
export default SelectedHome
