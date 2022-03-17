import React, { useContext, useEffect } from 'react'
import AppContext from 'context/appContext'
import { Col, Tabs, Card, Menu, Dropdown } from 'antd'
import { ListingsContainer } from './styles'
import SortByOptionsMenu from './SortByOptionsMenu'
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
              {searchResults.data.map((house, idx) => {
                return (
                  <Card
                    key={`home-${idx}`}
                    cover={<img src={house.photo}></img>}
                    style={{ width: '50%' }}
                  >
                    <Meta title="one million dollars" />
                  </Card>
                )
              })}
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
