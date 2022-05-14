import axios from 'axios'
import { fetchGoogleApiPlaceSugestion } from '../utils'
import { extractZipCodeFromString } from 'utils'

const suggestPlace = async (request, response) => {
  //   console.log('what is the request', request.query)
  try {
    const { isAutoComplete, name, city, state, zipCode } = request.query

    //------------------    AUTOCOMPLETE SUBMIT    -------------------------------

    const handleAutoComplete = () => {
      console.log('handleAutoComplete FIRED')
      response.send('AUTOCOMPLETE REQUEST SENT IN')
    }

    //------------------    STANDARD SUBMIT    -------------------------------

    const getGooglePlacesSuggestion = async (request) => {
      let input
      console.log('what is request sent into getGooglePlacesSuggestion', input)

      let responseObj = {
        isAutoComplete: null,
        name: '',
        city: '',
        state: '',
        zipCode: '',
      }

      /* CASE 1 : ZipCode or city was manually sent in */
      const extractStateCityZip = () => {
        const primaryDescription = requested.predictions[0].description

        //step 1 check if zipCode exists:
        console.log(
          'what is the predicted chuck',
          '########',
          primaryDescription,
          '########'
        )

        if (extractZipCodeFromString(primaryDescription)) {
          const primaryDescriptionChucks = primaryDescription.split(',')

          responseObj.zipCode = extractZipCodeFromString(primaryDescription)
          console.log(
            'what is primaryDescriptionChucks ',
            primaryDescriptionChucks
          )
        }
        if (!extractZipCodeFromString(primaryDescription)) {
          const primaryDescriptionChucks = primaryDescription.split(',')
          //TODO : you cant just index since the data types change in the array order based on
          //if its a zip, full address, just city name etc...

          // responseObj.city = primaryDescriptionChucks[0] //wont work

          primaryDescriptionChucks
            .map((s) => s.trim())
            .filter((s) => s !== 'USA')
            .forEach((str) => {
              //do some format checking
              console.log(str, 'YEEE')
              if (str) {
              }
            })

          console.log(
            'what is primaryDescriptionChucks ',
            primaryDescriptionChucks
          )
        }

        console.log(
          'responseObj with the props you added so far: ',
          '$$$$$$$$',
          responseObj,
          '$$$$$$$$'
        )
      }

      /* CASE 2 :  */
      const returnNoResults = () => {
        console.log('NO RESULTS FOUND')
        response.send('NO RESULTS FOUND')
      }

      //------------------    PRIMARY REQUEST   -------------------------------

      if (isAutoComplete === 'false') {
        zipCode ? (input = zipCode) : (input = name)
      }

      const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
      const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&components=country:us&key=${googleApiKey}`,
        headers: {},
      }
      const requested = await fetchGoogleApiPlaceSugestion(config)
      requested.status === 'OK' ? extractStateCityZip() : returnNoResults()
    }

    //-----------------------------------------------------------------

    isAutoComplete === 'true'
      ? handleAutoComplete()
      : getGooglePlacesSuggestion(request)

    //-----------------------------------------------------------------
  } catch (err) {
    console.log('error at pages/api/googleApis, check request')
  }
}
export default suggestPlace
