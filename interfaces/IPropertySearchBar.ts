export interface IGooglePlacesAddressObj {
  formatted_address: string
  geometry: {
    location: {
      '_.Ee': {
        lat: () => void
        lng: () => void
      }
    }
  }
  html_attributions: []
  name: string
  place_id: string
}
