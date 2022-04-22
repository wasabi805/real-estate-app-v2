import { IAction } from 'actions/interface'
import { updateNestedObj } from 'utils/helpers'
import { priceFilterPath, priceRangeSliderMinId } from 'utils/contants'

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
    slider: {
      moveMin: {
        move: true,
        value: `${percent * 100}% !important`,
      },
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
  const { range } = state.listings?.filters?.price?.slider
  const highestPrice = range[range.length - 1]
  const percent = num / highestPrice

  price = {
    maxField: num,
    slider: {
      moveMax: {
        move: true,
        value: `${percent * 100}% !important`,
      },
    },
  }

  return {
    type: SET_MAX_PRICE_FILTER_FIELD,
    payload: updateNestedObj(priceFilterPath)(price)(pricePayload),
  }
}
export const SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN =
  'SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN'

export const setPriceRangeSliderMaxMin = (
  array: number[],
  handleClassName: string
) => {
  const handleName = handleClassName.split(' ')[1]
  const isSliderActive = handleName === priceRangeSliderMinId

  price = {
    slider: {
      range: [array[0], array[1]],
      moveMin: {
        move: isSliderActive,
        value: array[0],
      },
      moveMax: {
        move: !isSliderActive,
        value: array[1],
      },
    },
  }

  return {
    type: SET_PRICE_PRICE_RANGE_SLIDER_MAX_MIN,
    payload: updateNestedObj(priceFilterPath)(price)(pricePayload),
  }
}
