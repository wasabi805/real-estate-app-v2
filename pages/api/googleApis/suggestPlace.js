import { fetchGoogleApiPlaceSugestion } from '../utils'
import { extractZipCodeFromString } from 'utils'
import getListings from 'pages/api/getListings'
import { stateCodes } from '../enums'

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

      /* CASE 1 : ZipCode or city was manually sent in */
      const extractStateCityZip = async () => {
        const primaryGuess = requested.predictions[0].description
        const primaryGuessSubStr = primaryGuess
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s !== 'USA')
        const allGuesses = requested.predictions

        //step 1 check if zipCode exists:
        console.log(
          'what is the predicted chuck',
          '########',
          primaryGuess,
          '########'
        )

        if (extractZipCodeFromString(primaryGuess)) {
          //  TODO: Should ask did you mean and show more predictions : will be did you mean

          // IF THE LAST ELEMENT IN ARRAY doesn't have a zipcode, then the array is an address
          // render more predictions

          //    [ '88888 Brown Dr', 'Twentynine Palms', 'CA' ] just 888888
          //    [ '12345 Taliesin Drive', 'Scottsdale', 'AZ' ] just 12345

          //    [ 'Palomar Park', 'CA 94062' ] - 94062
          //    [ 'Redwood City', 'CA 94061' ] - 94061
          //    [ 'Santa Barbara','CA 93117' ] santa barbara 93117 || santa barbara 93117 || someString 93117 more strings

          //verify if zipCode is regogized by autoPlace

          console.log(
            '???????',
            extractZipCodeFromString(
              primaryGuessSubStr[primaryGuessSubStr.length - 1]
            )
          )
          console.log('primaryGuessSubStr', primaryGuessSubStr)

          /* CASE PREDICTION RETURNED A ZIPCODE IT RECOGNIZED */
          if (
            extractZipCodeFromString(
              primaryGuessSubStr[primaryGuessSubStr.length - 1]
            )
          ) {
            // Format primaryGuess into object containing city and state derived from the zipcode
            let cityStateZip = primaryGuessSubStr[primaryGuessSubStr.length - 1]
              .split(' ')
              .reduce((acc, cur) => {
                acc.city = primaryGuessSubStr[0]
                return extractZipCodeFromString(cur)
                  ? { ...acc, zipCode: cur }
                  : { ...acc, state: cur }
              }, {})

            const req = {
              ...cityStateZip,
            }
            const listings = await getListings(req)

            return response.status(200).send({
              routeTo: 'cityPage',
              listings,
            })
          }

          /* CASE PREDICTION DIDN'T RETURN A ZIPCODE IT RECOGNIZED */
          if (
            !extractZipCodeFromString(
              primaryGuessSubStr[primaryGuessSubStr.length - 1]
            )
          ) {
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

          console.log(
            'what is primaryDescriptionChucks -has zipcode',
            primaryGuessSubStr
          )
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
