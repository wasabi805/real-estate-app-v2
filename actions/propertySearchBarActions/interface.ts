interface Ineighborhood {
  name: string
  city: string
  state_code: string
  level: string
  id: string // ex.) number string - "9"
}

interface IleadForm {
  type: string
  lead_type: string
  form: {
    name: {
      required: true
      minimum_character_count: number
    }
    email: {
      required: true
      minimum_character_count: number
    }
    phone: {
      required: true
      minimum_character_count: number
      maximum_character_count: number
    }
    message: {
      required: false
      minimum_character_count: number
    }
    agents: [
      {
        has_ratings: boolean
        is_listing_agent: boolean
      }
    ]
    show: boolean
  }
  is_lcm_enabled: boolean
  show_text_leads: boolean
  cashback_enabled: boolean
  smarthome_enabled: boolean
  flip_the_market_enabled: boolean
  local_phone: string // ex.) "(424)401-0267"
  local_phones: {
    comm_console_mweb: string // ex.) "(424)401-0267"
  }
}

export interface Ilisting {
  property_id: string
  is_new_construction: boolean
  listing_id: string
  prop_type: string
  last_update: string
  rdc_web_url: string
  prop_sub_type: string
  is_turbo: boolean
  address: string
  address_new: {
    city: string
    line: string
    postal_code: string
    state_code: string
    state: string
    county: string
    fips_code: string
    county_needed_for_uniq: boolean
    lat: number
    lon: number
    neighborhood_name: string
    neighborhoods: Ineighborhood[]
  }
  prop_status: string
  price_raw: number
  sqft_raw: number
  list_date: string
  office_name: string
  office_advertiser_id: number
  products: string[]
  is_showcase: boolean
  price: string // ex.) "$899,000"
  beds: number
  baths: number
  sqft: string // ex.) "602 sq ft"
  lot_size: string // ex.) "0.26 acres"
  mls: {
    name: string
    id: string //  "22-134415"
    plan_id: null | any
    abbreviation: string
    type: '22-134415'
  }
  data_source_name: string
  photo: string // ex.) "https://ap.rdcpix.com/76979dfda7626bb3c0473d2d5ff1fceel-m2214102933x.jpg",
  is_cobroker: boolean
  short_price: string // ex.) "$899K"
  baths_full: number
  photo_count: number
  lat: number
  lon: number
  is_new_listing: boolean
  has_leadform: boolean
  page_no: number
  rank: number
  list_tracking: string // ex.) "type|property|data|prop_id|1228450567|list_id|2940984452|page|rank|list_branding|listing_agent|listing_office|data_source|mls|advertiser_id|office|property_status|product_code|advantage_code^1|T|0|1|1AQM7|35T|G|4^^$0|1|2|$3|4|5|6|7|J|8|K|9|$A|L|B|M]|C|D|E|$F|N]|G|O|H|P|I|Q]]",
  suppression_flags: string[]
  lead_forms: IleadForm[]
}

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

export interface Iresponse {
  data: {
    meta: {
      build: string // ex.) "3.23.180"
      schema: string
      tracking_params: {
        channel: string
        siteSection: string
        city: string
        county: string
        neighborhood: string
        searchCityState: string
        state: string
        zip: string
        srpPropertyStatus: string // ex.) "srp:for_sale"
        listingActivity: string
        propertyStatus: string
        propertyType: string
        searchBathrooms: string
        searchBedrooms: string
        searchMaxPrice: string
        searchMinPrice: string
        searchRadius: string
        searchHouseSqft: string
        searchLotSqft: string
        searchResults: string // ex.) '1'
        sortResults: string
        searchCoordinates: string
        version: string
      }
      tracking: string // ex.) 'type|meta|data|resource_type|property_list|query|schema|mapsearch|client_id|rdc_mobile_native,10.33.1|limit|offset|city|Belmont|state_code|CA|sort|relevance|prop_status|for_sale|count|total^1|0|1|1C^^$0|1|2|$3|4|5|$6|7|8|9|A|M|B|N|C|D|E|F|G|H]|I|J|K|O|L|P]]'
    }
    returned_rows: number
    matching_rows: number
    listings: Ilisting[]
  }
  status: number
  statusText: string
  headers: {
    connection: string
    'content-length': string //ex.) '3872'
    date: string // ex.) 'Mon, 21 Mar 2022 03:37:05 GMT'
    etag: string // ex.) "f20-/bxvYt69Mo3g+wBNNBPycBcpsgA"
    'keep-alive': string // ex.) 'timeout=5'
  }
  config: {
    transitional: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
    transformRequest: [] // ex.) [null]
    transformResponse: [] // ex.) [null]
    timeout: 0
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    headers: {
      Accept: string
    }
    params: {
      location: string
      isAutoComplete: boolean
    }
    method: string
    url: string
  }
  request: {}
}
