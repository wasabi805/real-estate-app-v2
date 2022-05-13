import axios from 'axios'
export const fetchGoogleApiPlaceSugestion = (config) => {
  return axios(config)
    .then(function (response) {
      return response.data
    })
    .then((suggestion) => {
      return suggestion
    })

    .catch(function (error) {
      console.log(error)
    })
}
