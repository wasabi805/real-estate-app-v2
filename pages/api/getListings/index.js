import axios from 'axios'

const getListings = async (req, res) => {
  const { city, state } = req?.query
  console.log('what is req?.query', req?.query)
  console.log('what is req?.query.filters', req?.query.filters)
  let filters;
  if(req?.query.filters){
    filters = JSON.parse(req?.query.filters)
  }

  console.log('what are filters ', filters)
  if(!filters){
    console.log('SHOW ME ONLY HOMES FOR SALE')
  }

  if(filters?.status === 'for-sale'){
    console.log('SHOW ME ONLY HOMES FOR SALE')
    console.log('WITH THESE FILTERS', filters)
  }
  if(filters?.status === 'for-rent'){
    console.log('SHOW ME ONLY RENTALS')
    console.log('WITH THESE FILTERS', filters)
  }

  if(filters?.status === 'sold'){
    console.log('SHOW ME SOLD HOMES')
  }


  try {
 
  
    const options = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application / json',
        'x-rapidapi-host': process.env.REALTOR_HOST,
        'x-rapidapi-key': process.env.REALTOR_API_KEY,
      },
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',

      // data: req.body,

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
        return res.status(500).send( error )
      })

    // console.log(response, 'what is the response')
    // return response
  } catch (err) {
    console.log('Error at getListings', err)
    
  }
}

export default getListings
