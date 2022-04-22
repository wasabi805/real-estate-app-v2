import { IAction } from 'actions/interface'
import { updateNestedObj } from 'utils/helpers'
import { priceFilterPath } from 'utils/contants'

let price
const pricePayload = {
  listings: { filters: { price: '' } },
}

export const SET_MIN_PRICE_FILTER_FIELD = 'SET_MIN_PRICE_FILTER_FIELD'
export const setMinPriceFilterField = (
  num: number,
  state: any
): Pick<IAction, 'type' | 'payload'> => {
  const { range } = state.listings?.filters?.price?.slider
  const highestPrice = range[range.length - 1]
  const percent = num / highestPrice

  console.log('CALCULATING PERECNT', percent)

  price = {
    minField: num,
    moveMin: {
      move: true,
      value: `${percent * 100}% !important`,
    },
  }

  return {
    type: SET_MIN_PRICE_FILTER_FIELD,
    payload: updateNestedObj(priceFilterPath)(price)(pricePayload),
  }
}

export const SET_MAX_PRICE_FILTER_FIELD = 'SET_MAX_PRICE_FILTER_FIELD'
export const setMaxPriceFilterField = (
  num: number,
  state: any
): Pick<IAction, 'type' | 'payload'> => {
  const range = state.priceFilter.range
  const highestPriceIdx = state.priceFilter.range.length - 1

  const highestPrice = range[highestPriceIdx]
  const maxPrice = num
  const percent = maxPrice / highestPrice

  return {
    type: SET_MAX_PRICE_FILTER_FIELD,
    payload: {
      priceFilter: {
        maxField: num,
        moveMax: {
          move: true,
          value: `${percent * 100}% !important`,
        },
      },
    },
  }
}
export const SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN =
  'SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN'

export const setPriceRangeSliderMaxMin = (
  array: number[],
  handleClassName: string
) => {
  const handleName = handleClassName.split(' ')[1]
  const isSliderActive = handleName === 'ant-slider-handle-1'

  const min = array[0]
  const max = array[1]

  return {
    type: SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
    // payload: {
    //   priceFliter: {
    //     range: [min, max],
    //     moveMin: {
    //       move: isSliderActive,
    //       value: min,
    //     },
    //     moveMax: {
    //       move: !isSliderActive,
    //       value: max,
    //     },
    //   },
    // },
    payload: {
      listings: {
        filters: {
          price: {
            slider: {
              range: [min, max],
              moveMin: {
                move: isSliderActive,
                value: min,
              },
              moveMax: {
                move: !isSliderActive,
                value: max,
              },
            },
          },
        },
      },
    },
  }
}
