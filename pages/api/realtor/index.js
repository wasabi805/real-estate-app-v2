import axios from 'axios'
import { stateCodes } from '../enums'

const realtorApi = async (request, response) => {
//   console.log({ request: request.query }, 'What is the query from the front client?')
  try {
    const { location, isAutoComplete } = request.query

    const locationData = location.split(',')
    const formatLocationData = locationData
      .map((item) => item.trim(' '))
      .reverse()

    let stateCode
    let city

    const queryParam1 = formatLocationData[1].split(' ')[0]
    const queryParam2 = formatLocationData[2]
  
    // validate that queryParam1 is a validStateCode
    const validStateCodeSent = stateCodes.some( (state)=>{
        return Object.keys(state).pop() === queryParam1
      })

    // validate that queryParam1 is a valid spelling of state 
    const fullStateNameSent = stateCodes.some( (state)=>{
        return Object.values(state).pop() === queryParam1
      })

    // Scenerio 1.) AutoComplete sends a valid state name, but no city

    //ex.) California, USA
    if(isAutoComplete === 'true' && fullStateNameSent ){
        console.log('++++ the full stateName was sent from autoComplete +++++ ')
        console.log('send error back to front end and notify City and State are required')
    }

    //Scenerio 2.) AutoComplete sends a valid state code and city name, a zipcode, or a full address 
    if (isAutoComplete === 'true' && validStateCodeSent ) {
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
