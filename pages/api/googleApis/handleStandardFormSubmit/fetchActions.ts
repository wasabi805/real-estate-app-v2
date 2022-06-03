import {
  containsStateCode,
  getStateValueFromKey,
  extractCitiesInState,
} from '../../utils'
import { topTenCitiesByState } from '@pages/api/enums'

import getListings from '@pages/api/getListings'
import { extractZipCodeFromString } from 'utils'
import { cityPageUrl } from '../urls'
//STATE ABREV SENT AS STANDARD FORM SUBMIT
export const handleFetchStateAbrv = (request, response, predictions) => {
  let res
  const fullStateName = getStateValueFromKey(
    containsStateCode(request.query.name.toLowerCase())
  )
  res = {
    props: {
      routeTo: '/', //may not need this
      stateName: fullStateName,
      predictions: predictions || 'foo', //  send back all guesses and have user select one of them

      modal: {
        id: 'didYouMean???',
        isOpen: true,
      },
    },
  }
  return response.status(200).send(res)
}

export const zipCodeConfirmed = async (
  response,
  primaryGuessSubStr,
  primaryGuessSubStrLastVal
) => {
  let cityStateZip = primaryGuessSubStrLastVal.split(' ').reduce((acc, cur) => {
    acc.city = primaryGuessSubStr[0]
    return extractZipCodeFromString(cur)
      ? { ...acc, zipCode: cur }
      : { ...acc, state: cur }
  }, {})

  const req = {
    query: {
      city: cityStateZip.city,
      state: cityStateZip.state,
    },
  }

  //TODO : THIS GETS THE LISTINGS, ONLY RETURN THE CITY URL. THE GET LISTINGS PART SHOULD OCCUR IN APP's useEffct
  console.log('what is req from fetchActions', req)
  const data = await getListings(req)

  const url = cityPageUrl({
    cityName: cityStateZip.city,
    stateName: cityStateZip.state,
  })

    return response.status(200).send({
    props: {
      routeTo: url,
      // listings: data.listings,
      // cityName: cityStateZip.city,
      // stateName: cityStateZip.state,
      // city: cityStateZip.city,
      // state: cityStateZip.state,
      // zipCode: cityStateZip.zipCode,
      // topCities: [],
      // meta: {
      //   tracking_params: data.meta.tracking_params,
      // },
    },
  })

  // return response.status(200).send({
  //   props: {
  //     routeTo: url,
  //     // listings: data.listings,
  //     // cityName: cityStateZip.city,
  //     // stateName: cityStateZip.state,
  //     // city: cityStateZip.city,
  //     // state: cityStateZip.state,
  //     // zipCode: cityStateZip.zipCode,
  //     // topCities: [],
  //     // meta: {
  //     //   tracking_params: data.meta.tracking_params,
  //     // },
  //   },
  // })
}

export const zipCodeNotConfirmed = (response, allGuesses) => {
  return response.status(200).send({
    props: {
      modal: {
        id: 'didYouMean',
        isOpen: true,
        props: {
          stuff: 'things',
          predictions: allGuesses, //  send back all guesses and have user select one of them
        },
      },
    },
  })
}

export const stateNameConfirmed = (response, primaryGuessSubStr, stateAbr) => {
  const topCities = extractCitiesInState(stateAbr, topTenCitiesByState)

  const url = `/state/${primaryGuessSubStr[0]}`

  response.status(200).send({
    props: {
      routeTo: url,
      cityName: '',
      listings: [],
      stateName: primaryGuessSubStr[0],
      topCities,
    },
  })
}

export const cityOrCityAndStateConfirmed = async (
  response,
  primaryGuessSubStr
) => {
  const cityAndState = primaryGuessSubStr.reduce((acc, curr) => {
    return containsStateCode(curr)
      ? { ...acc, state: containsStateCode(curr) }
      : { ...acc, city: curr }
  }, {})

  const req = cityAndState
  const data = await getListings(req)

  const url = cityPageUrl({
    cityName: cityAndState.city,
    stateName: cityAndState.state,
  })
  return response.status(200).send({
    props: {
      routeTo: url,
      listings: data.listings,
      cityName: cityAndState.city,
      stateName: cityAndState.state,
      topCities: [],
      meta: {
        tracking_params: data.meta.tracking_params,
      },
    },
  })
}
