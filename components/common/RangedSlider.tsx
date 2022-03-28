import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Divider, Slider } from 'antd'
import 'antd/dist/antd.css'

const RangedSlider = styled(({ sliderRange }) => {
  // --- Required | Start : ANT Design markup for tool tip data display -----

  const [minMax, setMinMax] = useState([0, 1000000])
  const [showMin, setShowMin] = useState(false)

  const handleShowMinOrMaxInToolTip = (activeElement) => {
    const activeRangeMarker = activeElement.split(' ')[1]
    const displayMin = activeRangeMarker === 'ant-slider-handle-1'
    setShowMin(displayMin)
  }

  const handleChange = (minMaxRange) => {
    const min = minMaxRange[0]
    const max = minMaxRange[1]
    setMinMax([min, max])
  }
  // --- Required | END-  ANT Design markup for tool tip data display -----

  console.log('what is sliderRange', sliderRange)
  const sliderMin = sliderRange[0]
  const sliderMax = sliderRange[sliderRange.length - 1]

  console.log({ sliderMin, sliderMax })

  const handleAfterChange = (value) => {
    console.log('onAfterChange: ', value)
  }

  return (
    <Slider
      range={true}
      step={25000}
      min={sliderMin}
      max={sliderMax}
      defaultValue={[sliderMin, sliderMax]}
      onChange={(minMaxRange) => handleChange(minMaxRange)}
      onAfterChange={handleAfterChange}
      tipFormatter={(e) => (
        <div>
          {/* This is so dumb but hey it works,
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
