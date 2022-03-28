import React from 'react'
import styled from '@emotion/styled'
import { Slider } from 'antd'
import 'antd/dist/antd.css'

const RangedSlider = styled((props) => {
  const handleChange = (e) => {
    console.log(e)
    // console.log('onChange: ', value)
  }

  const handleAfterChange = (value) => {
    console.log('onAfterChange: ', value)
  }
  return (
    <Slider
      range
      step={10}
      defaultValue={[20, 50]}
      onChange={handleChange}
      onAfterChange={handleAfterChange}
    />
  )
})``

export default RangedSlider
