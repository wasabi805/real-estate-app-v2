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

  console.log('what is idValue', idValue)
  // ----- STRINGS -----
  // if is any is clicked after a range or single value for bedroooms is selected
  if (typeof idValue === 'string') {
    bedsAmount.currentRange = [idValue]
    bedsAmount.clickedNumber = 0
    return { bedsAmount }
  }
}
