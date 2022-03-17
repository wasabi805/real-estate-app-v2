import React from 'react'
import { Col, Tabs, Menu, Dropdown } from 'antd'
import { ListingsContainer } from './styles'
import SortByOptionsMenu from './SortByOptionsMenu'
const { TabPane } = Tabs

const Listings = () => {
  return (
    <ListingsContainer className={'start-HERE'}>
      <SortByOptionsMenu />

      <Col span={24}>
        <Tabs
          className={'photo-and-table-tab'}
          onTabClick={(key) => console.log(key)}
        >
          <TabPane tab="Photos" key="Photos">
            <div>Photos</div>
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
