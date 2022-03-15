import axios from 'axios'

const realtorApi = async (request, response) => {
  try {
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
