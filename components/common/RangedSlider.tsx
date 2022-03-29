import React, { useState, useEffect, useContext } from 'react'
import AppContext from 'context/appContext'
import styled from '@emotion/styled'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import { Divider, Slider } from 'antd'
import 'antd/dist/antd.css'

const { setPriceRangeSliderMaxMin} = ListingsFilterActions

const RangedSlider = styled(({ sliderRange, onAfterChange }) => {
  // --- Required | Start : ANT Design markup for tool tip data display -----
  const {state, dispatch} = useContext(AppContext)
  const [minMax, setMinMax] = useState([0, 1000000])
  const [showMin, setShowMin] = useState(false)

  const handleShowMinOrMaxInToolTip = (activeElement) => {
    const activeRangeMarker = activeElement.split(' ')[1]
    const displayMin = activeRangeMarker === 'ant-slider-handle-1'
    setShowMin(displayMin)
  }

  const handleChange = (minMaxRange) => {
    //TODO store these values in the reducer and flip
    dispatch(setPriceRangeSliderMaxMin(minMaxRange, document.activeElement?.className)) //this should also change the input field vals

    console.log('what is minMaxRange', minMaxRange)
    //state is verified its getting passed in actual state
    console.log('i fired state in ranged slider', state)
    
    // const min = minMaxRange[0]
    // const max = minMaxRange[1]
    // setMinMax([min, max])
  }
  // --- Required | END-  ANT Design markup for tool tip data display -----

  // console.log('what is sliderRange', sliderRange)
  const sliderMin = sliderRange[0] ||0
  const sliderMax = sliderRange[sliderRange.length - 1] || 6000000

  // console.log({ sliderMin, sliderMax })

  return (
    <Slider
      range={true}
      step={25000}
      min={sliderMin}
      max={sliderMax}
      defaultValue={[sliderMin, sliderMax]}
      onChange={(minMaxRange) => handleChange(minMaxRange)}
      onAfterChange={onAfterChange}
      tipFormatter={(e) => (
        <div>
          {/* This is not ideal but hey it works,
           Ant library doesn't provide an event object for onChange for it Slider comp, this is a hacky way around that :/  */}
          {(() => {
            handleShowMinOrMaxInToolTip(document.activeElement?.className)
          })()}

          {showMin ? `$someMinVal` : `$someMaxVal`}
        </div>
      )}
    />
  )
})``

export default RangedSlider
