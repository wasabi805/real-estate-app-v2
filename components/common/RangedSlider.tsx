import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Divider, Slider } from 'antd'
import 'antd/dist/antd.css'

const RangedSlider = styled(({ sliderRange, onAfterChange }) => {
  // --- Required | Start : ANT Design markup for tool tip data display -----

  const [minMax, setMinMax] = useState([0, 1000000])
  const [showMin, setShowMin] = useState(false)

  const handleShowMinOrMaxInToolTip = (activeElement) => {
    const activeRangeMarker = activeElement.split(' ')[1]
    const displayMin = activeRangeMarker === 'ant-slider-handle-1'
    setShowMin(displayMin)
  }

  const handleChange = (minMaxRange) => {
    //TODO store these values in the reducer and flip
    
    // priceFilter: {
    //   moveMin:{
    //     move: false,
    //     value: ''
    //   }
    // },
    console.log('i fired')
    const min = minMaxRange[0]
    const max = minMaxRange[1]
    setMinMax([min, max])
  }
  // --- Required | END-  ANT Design markup for tool tip data display -----

  // console.log('what is sliderRange', sliderRange)
  const sliderMin = sliderRange[0]
  const sliderMax = sliderRange[sliderRange.length - 1] || 6000000

  // console.log({ sliderMin, sliderMax })

  return (
    <Slider
      range={true}
      step={25000}
      min={0}
      max={sliderMax}
      defaultValue={[100000, 6000000]}
      onChange={(minMaxRange) => handleChange(minMaxRange)}
      onAfterChange={onAfterChange}
      tipFormatter={(e) => (
        <div>
          {/* This is not ideal but hey it works,
           Ant library doesn't provide an event object for onChange for it Slider comp, this is a hacky way around that :/  */}
          {(() => {
            handleShowMinOrMaxInToolTip(document.activeElement?.className)
          })()}

          {showMin ? `$${minMax[0]}` : `$${minMax[1]}`}
        </div>
      )}
    />
  )
})``

export default RangedSlider
