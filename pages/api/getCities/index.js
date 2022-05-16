import axios from 'axios'

const getCities = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://countries-cities.p.rapidapi.com/location/country/US/city/list',

      headers: {
        'x-rapidapi-host': process.env.COUNTRIES_CITIES_HOST,
        'x-rapidapi-key': process.env.COUNTRIES_CITIES_KEY,
      },
    }

    let response = await axios
      .request(options)
      .then((cities) => {
        return cities.data
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
    // axios.request(options).then(function (response) {
    //     console.log(response.data, 'WHAT ARE THE CITIES');
    //     return response.data
    // }).catch(function (error) {
    //     console.error(error);
    // });
  } catch (err) {
    console.log('Error occured in pages/api/getCities', err)
  }
}

export default getCities
