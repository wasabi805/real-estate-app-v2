import axios from 'axios'
import { fetchGoogleApiPlaceSugestion } from '../utils'

const suggestPlace = async (request, response) => {
  console.log('what is the request', request.query)
  try {
    const { isAutoComplete, city, state, name } = request.query

    const handleAutoComplete = () => {}

    const getGooglePlacesSuggestion = async (name) => {
      const extractStateAndCity = () => {
        const predictionChucks = requested.predictions
        // console.log('what is the predicted chuck', predictionChucks)
      }
      const returnNoResults = () => {
        console.log('NO RESULTS FOUND')
      }

      const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
      const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${name}&key=${googleApiKey}`,
        headers: {},
      }
      const requested = await fetchGoogleApiPlaceSugestion(config)
      requested.status === 'OK' ? extractStateAndCity() : returnNoResults()

      response.send('No ACTION TOOK PLACE')
    }

    isAutoComplete === 'true'
      ? handleAutoComplete()
      : getGooglePlacesSuggestion(name)

    // const handleGetSuggestion =()=>{

    // }
  } catch (err) {
    console.log('error at pages/api/googleApis, check request')
  }
}
export default suggestPlace
