import React, { useContext, useEffect, useState, useRef } from 'react'
import { SEARCH_PLACEHOLDER } from '../../strings'
import * as SearchActions from 'actions/searchActions'
import AppContext from 'context/appContext'
import { IGooglePlacesAddressObj } from 'interfaces/IPropertySearchBar'

const { setSearchField, autoCompleteUpdateState } = SearchActions

const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
const externalScript = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`

const PropertySearchBar = ()=>{
    const appContext = useContext(AppContext)
    const { state, dispatch } = appContext
    const { search } = state

    console.log('what is state', state)
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    let autoComplete;

    const loadScript =(url, callback)=>{
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function() {
              if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
              }
            };
          } else {
            script.onload = () => callback();
          }
          script.src = url;
          document.getElementsByTagName("head")[0].appendChild(script)
    };

    function handleScriptLoad(updateQuery, autoCompleteRef){
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { 
              componentRestrictions: { country: "us" },
              fields:['place_id', 'geometry','name', 'formatted_address']
             }
          );

          autoComplete.setFields(["address_components", "formatted_address"])  

          autoComplete.addListener("place_changed", () =>
          handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
      const addressObject = autoComplete.getPlace(); // get place from google api
      const query = addressObject.formatted_address;
      updateQuery(query);

      // TODO : set the state in reducer and redirect to next page
      console.log(addressObject, 'YEEE');
      handleAutoSelected(addressObject)
      
    }

    const handleAutoSelected=( autoSelectedInput: IGooglePlacesAddressObj )=>{
      console.log('bring to reducer')
      dispatch( autoCompleteUpdateState( autoSelectedInput ))
    }

    const handleHomeSearch = () => {}
    const handleSetInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      dispatch( setSearchField(value) )
    }

    useEffect(() => {
      loadScript(
        externalScript,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      );
    }, []);

    return(
        <input
          ref={autoCompleteRef}
          id={'autocomplete'}
          placeHolder={SEARCH_PLACEHOLDER}
          onSearch={handleHomeSearch}
          onChange={handleSetInputField}
          name={'seach-input'}
          value={search.value}
        />
    )
}

export default PropertySearchBar