import axios from 'axios'
import { stateCodes } from '../enums'

const realtorApi = async (request, response) => {
  console.log(request, 'What is the query from the front client?')

  const getListings = (stateCode, cityName) => {
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

    // IF A CITY AND STATE WAS ENTERED
    //CASE A:
    if ((stateCode, cityName)) {
      console.log('-----  CASE A  ---------')
      return axios
        .request(options)
        .then((listings) => {
          return JSON.stringify(listings.data)
        })
        .then((apiRes) => {
          response.status(200).send(apiRes)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    // IF ONLY THE STATE WAS PROVIDED
    if (stateCode && !cityName) {
      console.log('RETURN THE STATE PAGE')
      return response.status(200).send({
        meta: {
          tracking_params: {
            city: '',
            state: stateCode,
          },
        },
      })
    }
  }

  try {
    let stateCode
    let city
    /*  If request data was given as a standard form submit */

    if (request.query.isAutoComplete === 'false') {
      // console.log('----- NOT FROM AUTO COMPLETE -----')
      console.log(
        'Call google places to aid in format before sending to realtor API, the request that was sent is: ',
        request.query
      )

      const queryString = request.query.location // ex.) califonia || san jose || someNonStateorCity

      //if the query is more than one word
      const data = queryString.split(' ')
      const joinedString = data.join(`+`) //ex.) san jose = san+jose || south+dakota

      console.log('what is joinedString', joinedString)

      const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
      var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${joinedString}&key=${googleApiKey}`,
        headers: {},
      }

      // call the api for sugestions
      const suggestions = await axios(config)
        .then(function (response) {
          return response.data
        })
        .then((suggestion) => {
          return suggestion
        })

        .catch(function (error) {
          console.log(error)
        })

      console.log('what is suggestions', suggestions)
      //ex.) california = { predictions:[ { description: 'California, USA'},] status: 'OK' }
      //ex.) belmont = { predictions:[ {description: 'Belmont, CA, USA'}]   ,status: 'OK' }
      //ex.) someNonStateorCity = { predictions: [], status: 'ZERO_RESULTS' }

      if (suggestions.status === 'ZERO_RESULTS') {
        city = 'noResult'
        stateCode = 'noResult'
      }

      if (suggestions.status === 'OK' && suggestions.predictions.length > 0) {
        //check the value of the first object
        const description = suggestions.predictions[0].description.split(',')

        if (description[1].trim() === 'USA') {
          city = ''
          stateCode = description[0]
          return
        }

        const isValidCityAndState = stateCodes.some((obj) => {
          return Object.keys(obj).pop() === description[1].trim()
        })

        if (isValidCityAndState) {
          city = description[0].trim()
          stateCode = description[1].trim()
        }
      }

      //TODO: REMOVE WHEN CONFIRMED WORKING
      // const mainPrediction = suggestions.predictions[0].description
      //   .split(',')
      //   .map((str) => str.trim())
      // stateCode = mainPrediction[1]
      // city = mainPrediction[0]

      // console.log(mainPrediction, 'mainPrediction')
      // console.log({ stateCode, city })

      return getListings(stateCode, city)
    }

    /**
     * If request data was from Google Places Auto Complete
     */
    const { location, isAutoComplete } = request.query

    const locationData = location.split(',')

    // easier to grab the order of data when reversed since the state code tends to be at the end of the string google places api provides
    const formatLocationData = locationData
      .map((item) => item.trim(' '))
      .reverse()

    const queryParam1 = formatLocationData[1].split(' ')[0]
    const queryParam2 = formatLocationData[2]

    // validate that queryParam1 is a validStateCode
    const validStateCodeSent = stateCodes.some((state) => {
      return Object.keys(state).pop() === queryParam1
    })

    // validate that queryParam1 is a valid spelling for the state
    const fullStateNameSent = stateCodes.some((state) => {
      return Object.values(state).pop() === queryParam1
    })

    // Scenerio 1.) AutoComplete sends a valid state name, but no city

    //ex.) California, USA
    if (
      request.query.isAutoComplete === 'true' &&
      fullStateNameSent &&
      queryParam2 === undefined
    ) {
      console.log('++++ the full stateName was sent from autoComplete +++++ ')
      console.log({ queryParam1 })

      stateCode = queryParam1
    }

    //Scenerio 2.) AutoComplete sends a valid state code and city name, a zipcode, or a full address
    if (request.query.isAutoComplete === 'true' && validStateCodeSent) {
      stateCode = queryParam1
      city = queryParam2

      // TODO: if full address is provided, prepare 2nd api from  Realty Mole
      // https://rapidapi.com/realtymole/api/realty-mole-property-api/
    }
    return getListings(stateCode, city)
  } catch (err) {}
}

export default realtorApi
