import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { TileIconButton, ButtonRowContainer } from 'components/_common/styles'

interface IButtonGroup {
  text: string
  onClick: () => void
  type?: string
}

interface IButtonCompProps {
  id?: string
  name?: string
  onClick?: () => void
  instance?: {
    name: string
    icon?: any
  }
  align?: string
  groupType?: string
  buttonGroup?: IButtonGroup[]
  activeButton?: string
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined
}

const ButtonComp = styled(
  ({
    id,
    name,
    onClick,
    type,
    instance,
    groupType,
    buttonGroup,
    align,
    buttonStyle,
    activeButton,
  }: IButtonCompProps) => {
    switch (groupType) {
      case 'tile-top-icon':
        return (
          <ButtonRowContainer>
            {buttonGroup &&
              buttonGroup.map((btn) => {
                return (
                  <TileIconButton key={btn.id}>
                    <Button
                      id={btn.id}
                      onClick={btn.onClick}
                      type={btn.id === activeButton ? 'primary' : ''}
                    >
                      {btn.icon}
                      {btn.text}
                    </Button>
                  </TileIconButton>
                )
              })}
          </ButtonRowContainer>
        )

      case 'button-row':
        const isSelected = (activeBtn, id) => {
          if (activeBtn && typeof activeBtn === 'string') {
            return activeButton === id ? 'primary' : ''
          }
          if (activeBtn && Array.isArray(activeBtn)) {
            return activeBtn.indexOf(id) >= 0 && 'primary'
          }
        }
        return (
          <ButtonRowContainer align={align} buttonStyle={buttonStyle}>
            {buttonGroup.map((btn) => (
              <Button
                id={btn.id}
                key={btn.id}
                onClick={btn.onClick}
                type={activeButton && isSelected(activeButton, btn.id)}
                size={btn.size}
              >
                {btn.text}
              </Button>
            ))}
          </ButtonRowContainer>
        )

      default:
        return (
          <Button key={id} id={id} onClick={onClick} type={type}>
            {name}
          </Button>
        )
    }
  }
)``

export default ButtonComp
