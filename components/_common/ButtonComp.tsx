import styled from '@emotion/styled'
import { Button } from 'antd'
import { TileIconButton } from 'components/_common/styles'

interface IButtonCompProps {
  id?: string
  name: string
  onClick: () => void
  instance?: {
    name: string
    icon: any
  }
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
  ({ id, name, onClick, type, instance }: IButtonCompProps) => {
    if (instance?.name === 'tile-top-icon') {
      console.log(instance.icon)

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
    }

    //DEFAULT BUTTON
    return (
      <Button
        key={id}
        id={id}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        type={type}
      >
        {name}
      </Button>
    )
  }
)``

export default ButtonComp
