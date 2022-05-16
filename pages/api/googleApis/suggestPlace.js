import {
  fetchGoogleApiPlaceSugestion,
  containsStateCode,
  getStateValueFromKey,
  extractCitiesInState,
} from '../utils'
import { extractZipCodeFromString } from 'utils'
import getListings from 'pages/api/getListings'
import getCities from 'pages/api/getCities'
import { stateCodes } from '../enums'
import { getStateKeyFromValue } from '../utils'
import axios from 'axios'

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

      let resobj = {
        city: '',
        state: '',
        zipCode: '',

        routeTo: '',

        modal: {
          id: null,
          isOpen: false,
          props: {},
        },
      }

      //  TODO: Should ask did you mean and show more predictions : will be did you mean

      // IF THE LAST ELEMENT IN ARRAY doesn't have a zipcode, then the array is an address
      // render more predictions

      //    [ '88888 Brown Dr', 'Twentynine Palms', 'CA' ] just 888888
      //    [ '12345 Taliesin Drive', 'Scottsdale', 'AZ' ] just 12345

      //    [ 'Palomar Park', 'CA 94062' ] - 94062
      //    [ 'Redwood City', 'CA 94061' ] - 94061
      //    [ 'Santa Barbara','CA 93117' ] santa barbara 93117 || santa barbara 93117 || someString 93117 more strings

      //verify if zipCode is regogized by autoPlace

      /* STEP1:  ZipCode or city was manually sent in: */
      const extractStateCityZip = async () => {
        const primaryGuess = requested.predictions[0].description
        const primaryGuessSubStr = primaryGuess
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s !== 'USA')
        const primaryGuessSubStrLastVal =
          primaryGuessSubStr[primaryGuessSubStr.length - 1]

        //  BEFORE ANY CHECKS, SEE IF THE USER SENT IN JUST A STATE CODE:
        if (containsStateCode(name.toUpperCase())) {
          const fullStateName = getStateValueFromKey(
            containsStateCode(name.toUpperCase())
          )

          const res = {
            ...resobj,
            state: fullStateName,

            modal: {
              id: 'didYouMean',
              isOpen: true,
              props: {
                predictions: allGuesses, //  send back all guesses and have user select one of them
              },
            },
          }
          return response.status(200).send(res)
        }

        //START CHECKS IF a STATECODE WAS NOT MANUALLY SUBMITTED
        if (extractZipCodeFromString(primaryGuess)) {
          //CASE A: ZIPCODE WAS SENT IN

          /* CASE PREDICTION RETURNED A ZIPCODE IT RECOGNIZED */
          if (extractZipCodeFromString(primaryGuessSubStrLastVal)) {
            // Format primaryGuess into object containing city and state derived from the zipcode
            let cityStateZip = primaryGuessSubStrLastVal
              .split(' ')
              .reduce((acc, cur) => {
                acc.city = primaryGuessSubStr[0]
                return extractZipCodeFromString(cur)
                  ? { ...acc, zipCode: cur }
                  : { ...acc, state: cur }
              }, {})

            const req = cityStateZip
            const data = await getListings(req)

            data.routeTo = 'cityPage'

            return response.status(200).send(data)
          }

          /* CASE PREDICTION DIDN'T RETURN A ZIPCODE IT RECOGNIZED */
          if (!extractZipCodeFromString(primaryGuessSubStrLastVal)) {
            let clientRes = {
              ...resobj,
              routeTo: '/',
              modal: {
                id: 'didYouMean',
                isOpen: true,
                props: {
                  predictions: allGuesses, //  send back all guesses and have user select one of them
                },
              },
            }

            return response.status(200).send(clientRes)
          }
        }

        /* CASE City and or STATE was entered without a zipCode */

        if (!extractZipCodeFromString(primaryGuess)) {
          //TODO : you cant just index since the data types change in the array order based on
          //if its a zip, full address, just city name etc...

          // responseObj.city = primaryDescriptionChucks[0] //wont work

          //    [ 'California' ] just california

          //    [ 'Redwood City',  'CA' ] = redwood city

          //    [ 'Casa Grande', 'AZ' ] = ca --> should bring back state

          console.log(
            'what is primaryDescriptionChucks - no zipCode ',
            primaryGuessSubStr
          )

          const stateAbr = getStateKeyFromValue(
            primaryGuessSubStr[0],
            stateCodes
          )

          //if it returns the state name proper
          if (primaryGuessSubStr.length === 1 && stateAbr) {
            //get top 20 cities by popuation
            const data = await getCities()
            const allCitiesUS = data.cities

            extractCitiesInState(stateAbr, allCitiesUS)
          }

          //if something comes back that isn't just city and state
          //ex.) space = [space place, gilbert, az]
          if (primaryGuessSubStr.length > 2) {
            // console.log('what is allGuesses', allGuesses)
            // console.log('render did you mean')
          }

          //if city and state comeback
          if (primaryGuessSubStr.length == 2) {
            const cityAndState = primaryGuessSubStr.reduce((acc, curr) => {
              return containsStateCode(curr)
                ? { ...acc, state: containsStateCode(curr) }
                : { ...acc, city: curr }
            }, {})

            const req = cityAndState
            const listings = await getListings(req)

            return response.status(200).send({
              routeTo: 'cityPage',
              listings,
            })
          }
        }

        console.log(
          'responseObj with the props you added so far: ',
          '$$$$$$$$',
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
      const allGuesses = requested.predictions
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
