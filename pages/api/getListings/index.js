import axios from 'axios'

const getListings = async (req, res) => {
  const { city, state, zipCode } = req
  try {
    // const test = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    // await response.status(200).send({ foo:'bar'})
    // let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.REALTOR_HOST,
        'x-rapidapi-key': process.env.REALTOR_API_KEY,
      },
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',

      data: req.body,

      params: {
        state_code: `${state}`,
        city: `${city}`,
        offset: '0',
        limit: '200',
        sort: 'relevance',
      },
     
    }

    let response = await axios
      .request(options)
      .then((resp) => {
        return resp.data
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
