import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import fullHouse from 'public/fullHouse.jpg'
import AppContext from 'context/appContext'
import { SelectedHomesContainer } from 'components/City/styles'
import { ListingsTableHeader } from 'components/City/ListingsColumn/ListingsTable/styles'

import { Row, Col, Table } from 'antd'

const SelectedHome = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults, listingTable } = state

  const selectedHomeId = state.listingTable.currentHome
  const allHomes = searchResults.data.listings

  const selectedHome = allHomes.filter(
    (home) => state.listingTable.currentHome[0] === home.property_id
  )

  return (
    <>
      {listingTable.isTableView && (
        <SelectedHomesContainer>
          <Row style={{ marginTop: '1.45em' }}>
            <Col span={12}>
              <img
                alt="fullHouse"
                src={selectedHome[0].photo}
                style={{ width: '100%' }}
              />
            </Col>

            <Col span={12} style={{ background: 'azure' }}>
              house data
            </Col>
          </Row>

          <ListingsTableHeader />
        </SelectedHomesContainer>
      )}
    </>
  )
}
export default SelectedHome
