import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import {
  Histogram,
  DensitySeries,
  BarSeries,
  withParentSize,
  XAxis,
  YAxis,
} from '@data-ui/histogram'

const ResponsiveHistogram = withParentSize(
  ({ parentWidth, parentHeight, ...rest }) => {
    return <Histogram width={parentWidth} height={parentHeight} {...rest} />
  }
)

const rawData = Array(100).fill().map(Math.random)

const PriceHistogram = () => {
  const { state, dispatch } = useContext(AppContext)
  // console.log('----- PriceHistogram ------', 'Raw data', rawData)

  return (
    <div className="price-filter-histogram">
      <ResponsiveHistogram
        ariaLabel="My histogram of ..."
        orientation="vertical"
        cumulative={false}
        normalized={true}
        binCount={25}
        valueAccessor={(datum) => datum}
        binType="numeric"
        renderTooltip={({ event, datum, data, color }) => (
          <div>
            <strong style={{ color }}>
              {datum.bin0} to {datum.bin1}
            </strong>
            <div>
              <strong>count </strong>
              {datum.count}
            </div>
            <div>
              <strong>cumulative </strong>
              {datum.cumulative}
            </div>
            <div>
              <strong>density </strong>
              {datum.density}
            </div>
          </div>
        )}
      >
        <BarSeries
          rawData={state.priceFilter?.range /* or binnedData={...} */}
        />
        <XAxis />
        {/* <YAxis /> */}
      </ResponsiveHistogram>
    </div>
  )
}

export default PriceHistogram
