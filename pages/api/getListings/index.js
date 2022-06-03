import axios from 'axios'
import { access } from 'fs'

const getListings = async (req, res) => {
  const { city, state } = req?.query
  console.log('what is req?.query', req?.query)
  console.log('what is req?.query.filters', req?.query.filters)

  const requestKeyMap = {
    hometype: 'prop_type',
  }

  const renameKeys = (keyMap, obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        ...{ [keyMap[key] || key]: obj[key] },
      }
    }, {})
  }

  let options = {
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

  let filters
  if (req?.query.filters) {
    filters = JSON.parse(req?.query.filters)
  }

  console.log('what are filters ', filters)

  // WHAT TYPE OF HOME ARE THEY LOOKING FOR
  if (!filters?.status) {
    console.log('SHOW ME ONLY LISTINGS FOR SALE')
    console.log('WITH THESE FILTERS', filters)
    options.url = 'https://realtor.p.rapidapi.com/properties/list-for-sale'
  }

  if (filters?.status === 'for-sale') {
    delete filters.status
    console.log('SHOW ME ONLY LISTINGS FOR SALE')
    console.log('WITH THESE FILTERS', filters)

    const apiFilters = renameKeys(requestKeyMap, filters)
    options.params = {
      ...options.params,
      url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
      ...apiFilters,
    }
  }
  if (filters?.status === 'for-rent') {
    console.log('SHOW ME ONLY RENTAL LISTINGS')
    console.log('WITH THESE FILTERS', filters)
  }

  if (filters?.status === 'sold') {
    console.log('SHOW ME SOLD HOMES')
    console.log('WITH THESE FILTERS', filters)
  }

  try {
    await axios
      .request(options)
      .then((resp) => {
        return res.status(200).send(resp.data)
      })
      .catch((error) => {
        return res.status(500).send(error)
      })

    // console.log(response, 'what is the response')
    // return response
  } catch (err) {
    console.log('Error at getListings', err)
  }
}

export default getListings
