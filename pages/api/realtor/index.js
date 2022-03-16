import axios from 'axios'
import { stateCodes } from '../enums'

const realtorApi = async (request, response) => {
  console.log(
    typeof request.query.isAutoComplete,
    'What is the query from the front client?'
  )
  try {
    let stateCode
    let city
    /**
     * If request data was given as a standard form submit
     */
    if (request.query.isAutoComplete === 'false') {
      console.log(
        'Call google places to aid in format before sending to realtor API'
      )
      const queryString = request.query.location
      const data = queryString.split(' ')
  
      const rData = data.join(`+`)

      const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
      var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${rData}&key=${googleApiKey}`,
        headers: {},
      }

      axios(config)
        .then(function (response) {
          return JSON.stringify(response.data)
        }).then( (suggestion)=>response.status(200).send(suggestion) )

        .catch(function (error) {
          console.log(error)
        })
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
    if (request.query.isAutoComplete === 'true' && fullStateNameSent) {
      console.log('++++ the full stateName was sent from autoComplete +++++ ')
      console.log(
        'send error back to front end and notify City and State are required'
      )
    }

    //Scenerio 2.) AutoComplete sends a valid state code and city name, a zipcode, or a full address
    if (request.query.isAutoComplete === 'true' && validStateCodeSent) {
      stateCode = queryParam1
      city = queryParam2

      // TODO: if full address is provided, prepare 2nd api from  Realty Mole
      // https://rapidapi.com/realtymole/api/realty-mole-property-api/
    }

    var options = {
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
      params: {
        state_code: `${stateCode}`,
        city: `${city}`,
        offset: '0',
        limit: '200',
        sort: 'relevance',
      },
      headers: {
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REALTOR_API_KEY,
      },
    }
    // return
    return axios
      .request(options)
      .then((listings) => JSON.stringify(listings.data))
      .then((apiRes) => {
        response.status(200).send(apiRes)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (err) {}
}

export default realtorApi
