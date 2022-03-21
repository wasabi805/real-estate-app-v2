import React from 'react'
import { Row, Col, Card } from 'antd'
import { SpecRowTwo, SpecColTwo } from './styles'

import { Ilisting } from 'actions/propertySearchBarActions/interface'

interface IProps {
  houseData: Ilisting
}

const ListingCard: React.FC<IProps> = ({ houseData }) => {
  return (
    <Card cover={<img src={houseData.photo}></img>} style={{ width: '50%' }}>
      <Row>
        <Col span={18}>
          <h3>{houseData.price}</h3>
          <SpecRowTwo>
            <SpecColTwo className="spec-col-two">
              {houseData.beds} Beds
            </SpecColTwo>
            <SpecColTwo className="spec-col-two baths">
              {houseData.baths} Baths
            </SpecColTwo>
            <SpecColTwo className="spec-col-two sq-ft">
              {houseData.sqft_raw} Sq.Ft
            </SpecColTwo>
          </SpecRowTwo>
          <Row> {houseData.address} </Row>
        </Col>

        <Col span={6}>Heart</Col>
      </Row>
    </Card>
  )
}

export default ListingCard
