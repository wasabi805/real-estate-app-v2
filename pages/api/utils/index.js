import axios from 'axios'
import { stateCodes } from '../enums'
export const fetchGoogleApiPlaceSugestion = (config) => {
  return axios(config)
    .then(function (response) {
      return response.data
    })
    .then((suggestion) => {
      return suggestion
    })

    .catch(function (error) {
      console.log(error)
    })
}

export const containsStateCode = (str) => {
  const filteredResult = stateCodes.filter(
    (code) => Object.keys(code).pop() === str
  )
  return filteredResult.length > 0
    ? Object.keys(filteredResult[0]).pop()
    : false
}

export const getStateKeyFromValue = (stateProper, stateCodes) => {
  let result

  stateCodes.forEach((obj, idx) => {
    const stateValue = Object.values(stateCodes[idx])[0]
    let stateKey = Object.keys(stateCodes[idx])[0]

    console.log({ stateValue, stateKey })

    if (stateValue === stateProper) {
      result = stateKey
    }
  })
  return result
}
export const getStateValueFromKey = (stateAbrv) => {
  const stateValue = stateCodes.filter(
    (code) => Object.keys(code).pop() === stateAbrv
  )
  return stateValue[0][stateAbrv]
}

export const extractCitiesInState = (stateName, allCitiesUS) => {
  console.log('********', { stateName, allCitiesUS })
  // return allCitiesUS.map( (city)=>{
  //   console.log('city.division',city.division)
  //   return city.division
  // }).length
}
