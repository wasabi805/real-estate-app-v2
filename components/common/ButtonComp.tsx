import styled from '@emotion/styled'
import { Button } from 'antd'

const ButtonComp = styled(({ id, name, onClick }) => {
  return (
    <Button
      key={id}
      id={id}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      type=""
    >
      {name}
    </Button>
  )
})``

export default ButtonComp
