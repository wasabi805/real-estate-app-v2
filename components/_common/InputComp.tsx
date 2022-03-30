import React from 'react'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import { Input, InputNumber } from 'antd'

const InputComp = styled(
  ({ format, placeHolder, name, value, defaultValue, onChange, size }) => {
    if (format && format === 'dollars') {
      return (
        <InputNumber
          placeholder={placeHolder}
          name={name}
          value={value}
          // defaultValue={defaultValue}
          onChange={onChange}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value && value.replace(/\$\s?|(,*)/g, '')}
          size={size}
        />
      )
    }

    return (
      <Input
        placeHolder={placeHolder}
        name={name}
        value={value}
        // defaultValue={defaultValue}
        onChange={onChange}
        size={size}
      />
    )
  }
)``

export default InputComp
