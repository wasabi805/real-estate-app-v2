import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
import { updateNestedObj } from 'utils/helpers'
import { bedsNumberPrefix } from 'utils/contants'

import { handleBedsNumAction, setSingleButtonActive } from './helpers'
export const SET_FILTER_DRAWER_OPEN = 'SET_FILTER_DRAWER_OPEN'
export const setFilterDrawerOpen = (
  bool: boolean
): Pick<IAction, 'type' | 'payload'> => ({
  type: SET_FILTER_DRAWER_OPEN,
  payload: {
    listings: {
      isDrawerOpen: bool,
    },
  },
})

//PREVIOUSLY CALLED HANDLE_CLICK_BEDS_FILTER_BUTTON
export const SET_BEDS_VALUES = 'SET_BEDS_VALUES'
export const setBedsValues = (
  key: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  let newKey = key.split(bedsNumberPrefix)[1]
  let newKeyValue = newKey !== 'any' ? parseInt(newKey, 10) : 'any'

  // TODO store in reducer or a contants file.
  const range = [1, 2, 3, 4, 5]
  const bedsBathsPath: string[] = ['listings', 'filters', 'bedsBaths']

  let currentRange = state.listings?.filters.bedsBaths.currentRange.sort()
  let clickedNumber = state.listings?.filters.bedsBaths?.clickedNumber

  let keyNum = newKeyValue !== 'any' && newKeyValue

  const bedsBathPayload = {
    listings: {
      filters: {
        bedsBaths: {},
      },
    },
  }

  // ----- STRINGS -----
  // if is any is clicked after a range or single value for bedroooms is selected
  if (typeof newKeyValue === 'string') {
    return {
      type: SET_BEDS_VALUES,

      payload: updateNestedObj(bedsBathsPath)({
        currentRange: ['any'],
        clickedNumber: 0,
      })(bedsBathPayload),
    }
  }

  //  ----- NUMBERS -----
  if (typeof newKeyValue === 'number') {
    // removes the 'any' key if from range if any key was clicked
    currentRange = currentRange.filter((val) => val !== 'any')

    // Clicked number exists in range stored in reducer
    const isKeyNumPresent = currentRange.indexOf(newKeyValue) >= 0

    //if a range hasnt been set yet...
    if (!isKeyNumPresent && currentRange.length === 0) {
      const startRange = range.indexOf(keyNum)
      const returnRange = range.slice(startRange)

      return {
        type: SET_BEDS_VALUES,
        payload: updateNestedObj(bedsBathsPath)({
          currentRange: returnRange,
          clickedNumber: newKeyValue,
        })(bedsBathPayload),
      }
    }

    // if only one value in the range..

    if (currentRange.length === 1) {
      if (keyNum > currentRange[0]) {
        //grab the new range
        const newRange =
          keyNum !== 5
            ? range.slice(range.indexOf(currentRange[0]), keyNum)
            : range.slice(range.indexOf(currentRange[0]))

        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: keyNum,
          })(bedsBathPayload),
        }
      }

      if (keyNum < currentRange[0]) {
        const newRange =
          keyNum !== 5
            ? range.slice(range.indexOf(keyNum), currentRange[0])
            : range.slice(range.indexOf(keyNum))
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: keyNum,
          })(bedsBathPayload),
        }
      }
    }

    //if a range exists in the reducer
    if (currentRange.length >= 2) {
      //TODO REMOVE LATER
      const previousBtnClicked = state.listings?.clickedFilterName

      // if a number in the range is clicked twice in a row
      if (keyNum == clickedNumber) {
        const newRange = [keyNum]
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: newKeyValue,
          })(bedsBathPayload),
        }
      }

      // if the clicked value is less than the lowest range number in the reducer...
      // if (!isKeyNumPresent && keyNum < firstValue) {
      if (!isKeyNumPresent && keyNum < currentRange[0]) {
        console.log('-----CASE:1------ ')
        //get the new range of numbers
        const newRange = range.slice(
          range.indexOf(keyNum),
          currentRange[currentRange.length - 1]
        )
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: newKeyValue,
          })(bedsBathPayload),
        }
      }

      // range exists and number in range is clicked
      if (isKeyNumPresent && keyNum > clickedNumber) {
        console.log('-----CASE:2------ ')
        const newRange = range.slice(range.indexOf(currentRange[0]), keyNum)

        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: newKeyValue,
          })(bedsBathPayload),
        }
      }

      //SUSPECT
      //range exists but, clicked number is not in the range(set button active)
      if (!isKeyNumPresent && keyNum >= previousBtnClicked) {
        console.log('-----CASE:3------')

        const lastVal = keyNum

        const newRange = range.slice(range.indexOf(currentRange[0]), lastVal)
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: newKeyValue,
          })(bedsBathPayload),
        }
      }

      // if range exists, number is in range, clicked number value  is less that previously clicked button
      if (isKeyNumPresent && keyNum < clickedNumber) {
        console.log('-----CASE:4------ ')
        const newRange =
          clickedNumber !== 5
            ? range.slice(
                range.indexOf(keyNum),
                range.indexOf(range[currentRange[currentRange.length - 1]])
              )
            : range.slice(range.indexOf(keyNum))

        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: newKeyValue,
          })(bedsBathPayload),
        }
      }
    }
  }

  //---------------------------
  return {
    type: 'TESTING',
  }
}

export const SET_FILTER_CURRENT_BATHS_AMOUNT = 'SET_FILTER_CURRENT_BATHS_AMOUNT'
export const setFilterCurrentBathsAmount = (
  amount: string
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_FILTER_CURRENT_BATHS_AMOUNT,
    payload: {
      listings: {
        filters: {
          bedsBaths: {
            currentBaths: amount,
          },
        },
      },
    },
  }
}

export const SET_MIN_PRICE_FILTER_FIELD = 'SET_MIN_PRICE_FILTER_FIELD'
export const setMinPriceFilterField = (
  num: number,
  state: any
): Pick<IAction, 'type' | 'payload'> => {
  console.log('DEBUGGING', state)
  const range = state.priceFilter.range
  const highestPriceIdx = state.priceFilter.range.length - 1

  console.log('WHAT IS NUM???', num)
  const highestPrice = range[highestPriceIdx]
  const minPrice = num
  const percent = minPrice / highestPrice

  console.log('CALCULATING PERECNT', percent)
  return {
    type: SET_MIN_PRICE_FILTER_FIELD,
    payload: {
      priceFilter: {
        minField: num,
        moveMin: {
          move: true,
          value: `${percent * 100}% !important`,
        },
      },
    },
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
    payload: {
      priceFliter: {
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
  }
}

export const SET_FILTER_BY_PROPERTY_TYPE = 'SET_FILTER_BY_PROPERTY_TYPE'
export const setFilterByPropertyType = (
  propertyType: string[]
): Pick<IAction, 'type' | 'payload'> => {
  return {
    type: SET_FILTER_BY_PROPERTY_TYPE,
    payload: {
      forSaleRentSold: {
        filterBy: propertyType,
      },
    },
  }
}
