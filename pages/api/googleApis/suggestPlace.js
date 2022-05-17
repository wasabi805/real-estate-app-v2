import {
  fetchGoogleApiPlaceSugestion,
  containsStateCode,
  getStateValueFromKey,
  extractCitiesInState,
} from '../utils'
import { extractZipCodeFromString } from 'utils'
import { topTenCitiesByState } from '../enums'
import getListings from 'pages/api/getListings'
import getCities from 'pages/api/getCities'
import { stateCodes } from '../enums'
import { getStateKeyFromValue } from '../utils'
import axios from 'axios'

import handleStandardFormSubmit from './handleStandardFormSubmit'

const suggestPlace = async (request, response) => {
  //   console.log('what is the request', request.query)
  try {
    const { isAutoComplete, name, city, state, zipCode } = request.query

    //------------------    AUTOCOMPLETE SUBMIT    -------------------------------

    const handleAutoComplete = () => {
      console.log('handleAutoComplete FIRED')
      response.send('AUTOCOMPLETE REQUEST SENT IN')
    }

    //------------------    STANDARD SUBMIT    -------------------------------

    //-----------------------------------------------------------------

    isAutoComplete === 'true'
      ? handleAutoComplete()
      : handleStandardFormSubmit(request, response)

    //-----------------------------------------------------------------
  } catch (err) {
    console.log('error at pages/api/googleApis, check request')
  }
}
export default suggestPlace
