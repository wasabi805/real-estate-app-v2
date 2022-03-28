import React from 'react'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import { Input } from 'antd'

const InputComp = styled(({ placeHolder }) => {
  return <Input placeholder={placeHolder} />
})``

export default InputComp
