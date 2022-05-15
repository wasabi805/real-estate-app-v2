import axios from 'axios'

const getListings = (request, response) => {
  console.log('request.query.realtorRequest', request.query.realtorRequest)
  try {
    const test = axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log('hi--->', test)
    return response.status(200).send(request.query.realtorRequest)
  } catch (err) {
    console.log('Error at getListings')
  }
}

export default getListings
