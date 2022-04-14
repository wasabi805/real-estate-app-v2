import React from 'react'
import { Select, Collapse } from 'antd'
import { DropdownButtonContainer } from 'components/_common/styles'

const { Panel } = Collapse

const DropdownButton = ({
  buttonName,
  component,
  onChange,
  activeKey,
  btnKey,
}) => {
  return (
    <DropdownButtonContainer>
      <Collapse onChange={onChange} activeKey={activeKey}>
        <Panel className="MAKETHISZINDEXLARGE" header={buttonName} key={btnKey}>
          <div>{component}</div>
        </Panel>
      </Collapse>
    </DropdownButtonContainer>
  )
}

export default DropdownButton
