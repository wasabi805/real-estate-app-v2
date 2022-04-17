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
  buttonGroup: IButtonGroup[]
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
    buttonGroup,
    align,
  }: IButtonCompProps) => {
    switch (instance?.name) {
      case 'tile-top-icon':
        return (
          <TileIconButton>
            <Button
              key={id}
              id={id}
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              type={type}
            >
              {instance.icon}
              {name}
            </Button>
          </TileIconButton>
        )

      case 'button-row':
        return (
          <ButtonRowContainer align={align}>
            {buttonGroup.map((btn) => (
              <Button key={'1'} onClick={btn.onClick} type={btn?.type}>
                {btn.text}
              </Button>
            ))}
          </ButtonRowContainer>
        )

      default:
        return (
          <Button
            key={id}
            id={id}
            onClick={(e) => {
              e.stopPropagation()
            }}
            type={type}
          >
            {name}
          </Button>
        )
    }
  }
)``

export default ButtonComp
