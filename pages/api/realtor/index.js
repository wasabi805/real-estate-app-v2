import axios from 'axios'

const realtorApi = async (request, response) => {
  console.log({ request: request.query }, 'What is the query from the front client?')
  try {
    const { location, isAutoComplete } = request.query

    const locationData = location.split(',')
    const formatLocationData = locationData
      .map((item) => item.trim(' '))
      .reverse()

    let stateCode
    let city

    // scenerios
    if (isAutoComplete === 'true') {
      console.log(formatLocationData, 'YEZIR')
    }

    var options = {
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
      params: {
        state_code: 'NY',
        city: 'New York City',
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
