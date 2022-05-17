// import {
//     fetchGoogleApiPlaceSugestion,
//     containsStateCode,
//     getStateValueFromKey,
//     extractCitiesInState,
//   } from '../utils'
//   import { extractZipCodeFromString } from 'utils'
//   import { topTenCitiesByState } from '../enums'
//   import getListings from 'pages/api/getListings'
//   import getCities from 'pages/api/getCities'
//   import { stateCodes } from '../enums'
//   import { getStateKeyFromValue } from '../utils'
//   import axios from 'axios'

const handleAutoCompleteSubmitted = (request, response) => {
  console.log('AUTOCOMPLETE - Request ', request.query)
  response.send('AUTOCOMPLETE REQUEST SENT IN!!!!!!!!!')

  const options = {
    method: 'GET',
    url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
    params: {
      state_code: `${stateCode}`,
      city: `${cityName}`,
      offset: '0',
      limit: '200',
      sort: 'relevance',
    },
    headers: {
      'x-rapidapi-host': 'realtor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REALTOR_API_KEY,
    },
  }
}

export default handleAutoCompleteSubmitted
