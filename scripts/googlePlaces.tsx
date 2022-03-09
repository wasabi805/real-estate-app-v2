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
                         fields:['place_id', 'geometry','name']
                     }); 
             }`}
      </Script>
      <Script src={externalScript} />
    </div>
  )
}

export default GooglePlacesScript
