import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import { Row, Col, Tabs, Card, Menu, Dropdown } from 'antd'
import { ListingsContainer } from './styles'
import SortByOptionsMenu from './SortByOptionsMenu'
import ListingCard from './ListingCard'

const { TabPane } = Tabs
const { Meta } = Card

const Listings = () => {
  const appContext = useContext(AppContext)
  const { state, dispatch } = appContext
  const { searchResults } = state

  useEffect(() => {
    console.log(state)
  }, [])

  return (
    <ListingsContainer className={'start-HERE'}>
      <SortByOptionsMenu />

      <Col span={24}>
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => console.log(key)}
        >
          <TabPane tab="Photos" key="Photos">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {searchResults.data.map((house) => (
                <ListingCard key={house.property_id} houseData={house} />
              ))}
            </div>
          </TabPane>

          <TabPane tab="Table" key="Table">
            <div>Tables</div>
          </TabPane>
        </Tabs>{' '}
      </Col>
    </ListingsContainer>
  )
}

export default Listings
