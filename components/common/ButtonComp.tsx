import styled from '@emotion/styled'
import { Button } from 'antd'

interface IButtonCompProps {
  id?: string
  name: string
  onClick: () => void
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined
}

const ButtonComp = styled(({ id, name, onClick, type }: IButtonCompProps) => {
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
})``

export default ButtonComp
