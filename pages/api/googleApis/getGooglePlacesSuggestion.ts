
import {
    fetchGoogleApiPlaceSugestion,
    containsStateCode,
    getStateValueFromKey,
    extractCitiesInState,
  } from '../utils'

const testGetGooglePlacesSuggestion = ( request, googlePlacesResult )=>{
    const { isAutoComplete, name, city, state, zipCode } = request.query
    console.log('what is Initialrequest', name)
    //name is the primary driver

    const handleStateAbrev =()=>{
        console.log('----STATE ARBVE SENT IN -----')
    }

    let type = 'default'

     let responseAction={
         stateAbrev: handleStateAbrev,
         default: ()=>console.log('default responseAction')
     }

    const figureOutWhatToDoWithName = (name)=>{
        // State ABREV was sent , ex. CA, AZ , CO ...etc
        if(containsStateCode(name.toUpperCase())){
           return type= 'stateAbrev'
        }

        //If a State ABREV was not sent in, start to figure out what kind of data was sent
        console.log('googlePlacesResult', googlePlacesResult)





    }

    figureOutWhatToDoWithName(name)
    responseAction[type]()
}

export default testGetGooglePlacesSuggestion