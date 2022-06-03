import { fetchGoogleApiPlaceSugestion, containsStateCode } from '../../utils'
import { extractZipCodeFromString } from 'utils'
import { stateCodes } from '../../enums'
import { getStateKeyFromValue } from '../../utils'
import * as FetchActions from './fetchActions'

const handleStandardFormSubmit = async (request, response) => {
  /* Start by spliiting up autocomplete string results */
  console.log('what is request.query', request.query)
  const extractStateCityZip = async () => {
    const primaryGuess = autoCompleteResults.predictions[0].description
    const primaryGuessSubStr = primaryGuess
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== 'USA')

    const primaryGuessSubStrLastVal =
      primaryGuessSubStr[primaryGuessSubStr.length - 1]

    //  BEFORE ANY CHECKS, SEE IF THE USER SENT IN JUST A STATE CODE:
    //CASE 1 : StateAbrev manually sent
    if (containsStateCode(request.query.name.toUpperCase())) {
      const res = FetchActions.handleFetchStateAbrv(
        request,
        response,
        allGuesses
      )
      return response.status(200).send(res)
    }

    /* CASE 2: ZIPCODE WAS SENT IN - 2 outcomes, the zipcode was recongized or not recognized by auto complete */
    if (extractZipCodeFromString(primaryGuess)) {
      /* CASE 2A PREDICTION RETURNED A ZIPCODE IT RECOGNIZED */
      //ex.) 85225
      if (extractZipCodeFromString(primaryGuessSubStrLastVal)) {
        return FetchActions.zipCodeConfirmed(
          response,
          primaryGuessSubStr,
          primaryGuessSubStrLastVal
        )
        
      }

      /* CASE 2B PREDICTION DIDN'T RETURN A ZIPCODE IT RECOGNIZED */
      //ex.) 88888
      if (!extractZipCodeFromString(primaryGuessSubStrLastVal)) {
        return FetchActions.zipCodeNotConfirmed(response, allGuesses)
      }
    }

    /* CASE 3: City and or STATE ENTERED W/O ZIPCODE */
    if (!extractZipCodeFromString(primaryGuess)) {
      const stateAbr = getStateKeyFromValue(primaryGuessSubStr[0], stateCodes)

      /* CASE 3A: FULL STATE NAME ENTERED , autocomplete recognizes the state name proper, redirect to state page */
      if (primaryGuessSubStr.length === 1 && stateAbr) {
        return FetchActions.stateNameConfirmed(
          response,
          primaryGuessSubStr,
          stateAbr
        )
      }

      //CASE 3B : CITY or CITY & STATE ENTERED , autocomplete recognizes city and state, redirect to city page
      //if city and state are recogized by the auto complete
      if (primaryGuessSubStr.length == 2) {
        FetchActions.cityOrCityAndStateConfirmed(response, primaryGuessSubStr)
      }

      //if something comes back that isn't just city and state
      //ex.) space = [space place, gilbert, az]
      if (primaryGuessSubStr.length > 2) {
        // console.log('what is allGuesses', allGuesses)
        // console.log('render did you mean')
      }
    }
  }

  /* CASE 4 : Giberish was sent in  */
  //ex.) ahjdajsjui
  const returnNoResults = () => {
    console.log('NO RESULTS FOUND')
    response.send('NO RESULTS FOUND')
  }

  //------------------    PRIMARY REQUEST   -------------------------------

  let input
  if (request.query.isAutoComplete === 'false') {
    request.query.zipCode
      ? (input = request.query.zipCode)
      : (input = request.query.name)
  }

  const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&components=country:us&key=${googleApiKey}`,
  }
  const autoCompleteResults = await fetchGoogleApiPlaceSugestion(config)

  const allGuesses = autoCompleteResults.predictions

  autoCompleteResults.status === 'OK'
    ? extractStateCityZip()
    : returnNoResults()
}

export default handleStandardFormSubmit
