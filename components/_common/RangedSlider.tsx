import React, { useState, useContext } from 'react'
import AppContext from 'context/appContext'
import styled from '@emotion/styled'
import * as ListingsFilterActions from 'actions/listingsFilterActions'
import { Slider } from 'antd'
import 'antd/dist/antd.css'

const { setPriceRangeSliderMaxMin, setMaxPriceFilterField } =
  ListingsFilterActions

const RangedSlider = styled(({ sliderRange, onAfterChange }) => {
  // --- Required | Start : ANT Design markup for tool tip data display -----
  const { state, dispatch } = useContext(AppContext)
  const [minMax, setMinMax] = useState(state.priceFilter?.range)
  const [showMin, setShowMin] = useState(false)

  const handleShowMinOrMaxInToolTip = (activeElement) => {
    const activeRangeMarker = activeElement.split(' ')[1] //handler className, min or max

    const displayMin = activeRangeMarker === 'ant-slider-handle-1'
    setShowMin(displayMin)
  }

  const handleChange = (minMaxRange) => {
    //TODO store these values in the reducer and flip
    dispatch(
      setPriceRangeSliderMaxMin(minMaxRange, document.activeElement?.className)
    )
    const min = minMaxRange[0]
    const max = minMaxRange[1]
    setMinMax([min, max])
  }
  // --- Required | END-  ANT Design markup for tool tip data display -----

  const sliderMin = sliderRange[0] || 0
  const sliderMax = sliderRange[sliderRange.length - 1] || 12345678

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

          {showMin
            ? `$${minMax[0]}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            : `$${minMax[1]}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </div>
      )}
    />
  )
})``

export default RangedSlider
