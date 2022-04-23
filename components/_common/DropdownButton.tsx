import React from 'react'
import { Collapse } from 'antd'
import { DropdownButtonContainer } from 'components/_common/styles'

const { Panel } = Collapse

interface IDropdownButtonProps {
  className?: string
  buttonName: string
  component?: JSX.Element
  onChange?: () => void
  activeKey: string
  btnKey: string
  buttonStyles: React.CSSProperties
}

const DropdownButton = ({
  className,
  buttonName,
  component,
  onChange,
  activeKey,
  btnKey,
  buttonStyles,
}: IDropdownButtonProps) => {
  return (
    <DropdownButtonContainer buttonStyles={buttonStyles}>
      <Collapse onChange={onChange} activeKey={activeKey} className={className}>
        <Panel className="MAKETHISZINDEXLARGE" header={buttonName} key={btnKey}>
          <div>{component}</div>
        </Panel>
      </Collapse>
    </DropdownButtonContainer>
  )
}

export default DropdownButton
