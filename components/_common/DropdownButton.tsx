import React from 'react'
import { Select, Collapse } from 'antd'
import { DropdownButtonContainer } from 'components/_common/styles'

const { Panel } = Collapse

const DropdownButton = ({ buttonName, component }) => {
  return (
    <DropdownButtonContainer>
      <Collapse onChange={() => console.log('hello')}>
        <Panel className="MAKETHISZINDEXLARGE" header={buttonName} key="1">
          <div>{component}</div>
        </Panel>
      </Collapse>
      ,
    </DropdownButtonContainer>
  )
}

export default DropdownButton
