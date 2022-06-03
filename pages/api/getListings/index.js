import axios from 'axios'

const getListings = async (req, res) => {
  console.log('what is req?????', Object.keys(req))
  console.log('what is just req??', req)
  const { city, state } = req?.query
  try {
    // const test = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    // await response.status(200).send({ foo:'bar'})
    // let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    const options = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application / json',
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

    await axios
      .request(options)
      .then((resp) => {
        return res.status(200).send(resp.data)
      })
      .catch((error) => {
        return res.send({ error })
      })

    // console.log(response, 'what is the response')
    // return response
  } catch (err) {
    console.log('Error at getListings', err)
    return err
  }
}

export default getListings
