import React from 'react'
import Script from 'next/script'
/**
 * expected behavior to clear out env at runtime | see : https://github.com/vercel/next.js/issues/26582
 */
const googleApiKey = String(process.env.NEXT_PUBLIC_API_KEY)
const externalScript = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=initAutoComplete`

const GooglePlacesScript: React.FC = () => {
  return (
    <div>
      <Script id="initAutoComplete">
        {`let autocomplete; 
             function initAutoComplete(){
                 autocomplete= new google.maps.places.Autocomplete(
                     document.getElementById('autocomplete'),
                     { 
                         componentRestrictions:{
                             'country':['US']
                         },
                         fields:['place_id', 'geometry','name', 'formatted_address']
                     }); 
                     autocomplete.addListener('place_changed', onPlaceChanged);
             }
             
             function onPlaceChanged(){
                 var place = autocomplete.getPlace();
                 if(!place.geometry){
                    // predicted place wasn't selected by the user, reset the input field
                    document.getElementById('autocomplete').placeholder='Enter an address, neighborhood, city or ZIP code';
                 }else{
                     //populate the field with their selection
                     document.getElementById('autocomplete').value = place.formatted_address;
                 }
             }
             
             `}
      </Script>
      <Script src={externalScript} />
    </div>
  )
}

export default GooglePlacesScript
