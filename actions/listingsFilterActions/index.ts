import { IAction } from 'actions/interface'
import { IinitialState } from 'reducers/interface'
import { updateNestedObj } from 'utils/helpers'
import { bedsNumberIdPrefix } from 'utils/contants'
import { bedsButtonFilterRange } from 'reducers/initialValues'
import { bedsBathsPayload } from 'reducers/initialValues'

export const SET_BEDS_VALUES = 'SET_BEDS_VALUES'
export const setBedsValues = (
  buttonId: string,
  state: IinitialState
): Pick<IAction, 'type' | 'payload'> => {
  let idSuffix: string = buttonId.split(bedsNumberIdPrefix)[1]
  let idValue: Number | string =
    idSuffix !== 'any' ? parseInt(idSuffix, 10) : 'any'

  // TODO store in reducer or a contants file.
  const range = bedsButtonFilterRange
  const bedsBathsPath: string[] = ['listings', 'filters', 'bedsBaths']

  let currentRange = state.listings?.filters?.bedsBaths?.currentRange.sort()
  let clickedNumber = state.listings?.filters?.bedsBaths?.clickedNumber

  let keyNum = idValue !== 'any' && idValue

  // ----- STRINGS -----
  // if is any is clicked after a range or single value for bedroooms is selected
  if (typeof idValue === 'string') {
    return {
      type: SET_BEDS_VALUES,

      payload: updateNestedObj(bedsBathsPath)({
        currentRange: ['any'],
        clickedNumber: 0,
      })(bedsBathsPayload),
    }
  }

  //  ----- NUMBERS -----
  if (typeof idValue === 'number') {
    // removes the 'any' key if from range if any key was clicked
    currentRange = currentRange!.filter((val: Number | string) => val !== 'any')

    // Clicked number exists in range stored in reducer
    const isKeyNumPresent: boolean = currentRange.indexOf(idValue) >= 0

    //if a range hasnt been set yet...
    if (!isKeyNumPresent && currentRange.length === 0) {
      const startRange = range.indexOf(keyNum)
      const returnRange = range.slice(startRange)

      return {
        type: SET_BEDS_VALUES,
        payload: updateNestedObj(bedsBathsPath)({
          currentRange: returnRange,
          clickedNumber: idValue,
        })(bedsBathsPayload),
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
          })(bedsBathsPayload),
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
          })(bedsBathsPayload),
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
            clickedNumber: idValue,
          })(bedsBathsPayload),
        }
      }

      // if the clicked value is less than the lowest range number in the reducer...
      // if (!isKeyNumPresent && keyNum < firstValue) {
      if (!isKeyNumPresent && keyNum < currentRange[0]) {
        //get the new range of numbers
        const newRange = range.slice(
          range.indexOf(keyNum),
          currentRange[currentRange.length - 1]
        )
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: idValue,
          })(bedsBathsPayload),
        }
      }

      // range exists and number in range is clicked
      if (isKeyNumPresent && keyNum > clickedNumber) {
        const newRange = range.slice(range.indexOf(currentRange[0]), keyNum)

        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: idValue,
          })(bedsBathsPayload),
        }
      }

      //range exists but, clicked number is not in the range(set button active)
      if (!isKeyNumPresent && keyNum >= previousBtnClicked) {
        const newRange = range.slice(range.indexOf(currentRange[0]), keyNum)
        return {
          type: SET_BEDS_VALUES,
          payload: updateNestedObj(bedsBathsPath)({
            currentRange: newRange,
            clickedNumber: idValue,
          })(bedsBathsPayload),
        }
      }

      // if range exists, number is in range, clicked number value  is less that previously clicked button
      if (isKeyNumPresent && keyNum < clickedNumber) {
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
            clickedNumber: idValue,
          })(bedsBathsPayload),
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
