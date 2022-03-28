import React from 'react'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import { Input, InputNumber } from 'antd'

const InputComp = styled(({ placeHolder, size, format, onChange }) => {
  console.log('what is format? : ', format)
  const handleOnChange = (value) => {
    console.log(value)
    // return onChange()
  }

  if (format && format === 'dollars') {
    return (
      <InputNumber
        placeholder={placeHolder}
        size={size}
        defaultValue={0}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        onChange={(value) => handleOnChange(value)}
      />
    )
  }

  return <Input placeholder={placeHolder} size={size} />
})``

export default InputComp
