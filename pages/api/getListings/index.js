import axios from 'axios'
import { access } from 'fs'
import { getStatus } from '../helpers'
import { replaceWhiteSpaceWith } from 'utils'

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

  let filters = {}
  if (req?.query.filters) {
    filters = JSON.parse(req?.query.filters)
  }

  //IF ANY FILTERS EXIST...
  if (Object.keys(filters).length > 0) {
    const filters = JSON.parse(req?.query?.filters)

    //Status
    filters?.status
      ? (options.url = getStatus(filters?.status))
      : (options.url =
          'https://realtor.p.rapidapi.com/properties/list-for-sale')

    //HomeTypes
    filters.homeType ? options.params.prop_type = replaceWhiteSpaceWith(filters.homeType, ','):  filters = filters

    



    console.log('RUN THE CHECKS', filters)

    // options.url = getStatus()
  }

  //   const apiFilters = renameKeys(requestKeyMap, filters)
  //   options.params = {
  //     ...options.params,
  //     url: 'https://realtor.p.rapidapi.com/properties/list-for-sale',
  //     ...apiFilters,
  //   }
  // }

  // if (filters?.status === 'sold') {
  //   console.log('SHOW ME SOLD HOMES')
  //   console.log('WITH THESE FILTERS', filters)
  // }

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
