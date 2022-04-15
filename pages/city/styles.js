import React from 'react'
import styled from '@emotion/styled'
import { Col } from 'antd'

export const CityWrapper = styled.div`
  position: fixed;
  margin-top: 6.4vh;
`

export const MapColumnContainer = styled((props) => <Col {...props} />)`
  border: 2px solid lime;
`

export const ListingsColumnContainer = styled((props) => <Col {...props} />)`
  border: 2px solid yellow;
  padding: 1rem 2rem 0 2rem;
  width: 100vw;
  height: 89vh;
`
