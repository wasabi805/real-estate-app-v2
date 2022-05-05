import { IinitialState } from 'reducers/interface'
import { bedsNumberIdPrefix } from 'utils/contants'
import { bedsButtonFilterRange } from 'reducers/initialValues'
export const defineFilterPriceSliderData = (data: []) => {
  //TODO: sort the listings by asscending order
  console.log('what is properties', data.listings)

  return {
    startSlider: '',
    endSlider: '',
  }
}

interface IBedsAmount {}

export const defineBedsAmount = (className: string, state: IinitialState) => {
  let idSuffix: string = className.split(bedsNumberIdPrefix)[1]

  let idValue: Number | string =
    idSuffix !== 'any' ? parseInt(idSuffix, 10) : 'any'

  // TODO store in reducer or a contants file.
  const range = bedsButtonFilterRange
  const bedsBathsPath: string[] = ['listings', 'filters', 'bedsBaths']

  let currentRange = state.listings?.filters?.bedsBaths?.currentRange.sort()
  let clickedNumber = state.listings?.filters?.bedsBaths?.clickedNumber

  let keyNum = idValue !== 'any' && idValue

  interface IbedsAmount {
    currentRange: string[] | number[]
    clickedNumber: string | number
  }
  let bedsAmount: IbedsAmount = {
    currentRange: [],
    clickedNumber: '',
  }

  // ----- STRINGS -----
  // if is any is clicked after a range or single value for bedroooms is selected
  if (typeof idValue === 'string') {
    bedsAmount.currentRange = [idValue]
    bedsAmount.clickedNumber = 0
    return { bedsAmount }
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
      const newRange = range.slice(startRange)

      bedsAmount.currentRange = newRange
      bedsAmount.clickedNumber = idValue
      return { bedsAmount }
    }

    // if only one value in the range..

    if (currentRange.length === 1) {
      if (keyNum > currentRange[0]) {
        //grab the new range
        const newRange =
          keyNum !== 5
            ? range.slice(range.indexOf(currentRange[0]), keyNum)
            : range.slice(range.indexOf(currentRange[0]))

        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = keyNum
        return { bedsAmount }
      }

      if (keyNum < currentRange[0]) {
        const newRange =
          keyNum !== 5
            ? range.slice(range.indexOf(keyNum), currentRange[0])
            : range.slice(range.indexOf(keyNum))
        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = keyNum
        return { bedsAmount }
      }
    }

    //if a range exists in the reducer
    if (currentRange.length >= 2) {
      // range exists and number in range clicked is greater than the last clicked number
      if (isKeyNumPresent && keyNum > clickedNumber) {
        const newRange = range.slice(range.indexOf(currentRange[0]), keyNum)
        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = idValue
        return { bedsAmount }
      }

      //range exists but, clicked number is not in the active range, and the new clicked value is greater than the previous clicked value
      if (keyNum > clickedNumber && isKeyNumPresent === false) {
        const newRange = range.slice(range.indexOf(currentRange[0]), keyNum)
        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = idValue
        return { bedsAmount }
      }

      // if a number in the range is clicked twice in a row
      if (keyNum == clickedNumber) {
        const newRange = [keyNum]

        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = idValue
        return { bedsAmount }
      }

      // if the clicked value is less than the lowest range number in the reducer...
      if (!isKeyNumPresent && keyNum < currentRange[0]) {
        //get the new range of numbers
        const newRange = range.slice(
          range.indexOf(keyNum),
          currentRange[currentRange.length - 1]
        )
        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = idValue
        return { bedsAmount }
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

        bedsAmount.currentRange = newRange
        bedsAmount.clickedNumber = idValue
        return { bedsAmount }
      }
    }
  }
}
