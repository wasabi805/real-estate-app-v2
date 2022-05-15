import axios from 'axios'

const getListings = async (req, res) => {
  console.log('request.query.realtorRequest', req)
  const { city, state, zipCode } = req
  try {
    // const test = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    // await response.status(200).send({ foo:'bar'})
    // let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    const options = {
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
      params: {
        state_code: `${state}`,
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

    let response = await axios
      .request(options)
      .then((listings) => {
        return listings.data
      })
      .catch((error) => {
        console.error(error)
        return {
          data: {
            error,
          },
        }
      })

    return response
  } catch (err) {
    console.log('Error at getListings', err)
  }
}

export default getListings
