import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'context/appContext'
import axios from 'axios'
import { IHooksParam } from '@hooks/interfaces'
import useAppModal from '@hooks/useAppModal'
import * as GlobalActions from 'actions/GlobalActions'
import * as PropertySearchBarActions from 'actions/propertySearchBarActions'
import { useRouter } from 'next/router'
import { buildUrlFilterString } from '@hooks/helpers'

import {
  containsSubString,
  extractHTMLTagValue,
  isZipCode,
  extractZipCodeFromString,
} from 'utils'

const useAutoComplete = () => {
  interface IInputProps {
    isAutoComplete: null | boolean
    input: {
      name: null | any
    }
    prev?: null | any
  }

  interface IRequestParam {
    isAutoComplete: null | boolean
    name: null | string

    city: null | string
    state: null | string
    zipCode: null | string
  }

  const router = useRouter()
  const { setIsLoading } = GlobalActions
  const { fetchSugestionSuccess, updateStateWithSearchResults } =
    PropertySearchBarActions

  const { state, dispatch } = useContext(AppContext)
  const { activateModal } = useAppModal()
  const [inputProps, setInputProps] = useState<IInputProps>({
    isAutoComplete: null,
    input: {
      name: null,
    },
    prev: null,
  })

  const [autoCompleteResp, setAutoCompleteResp] = useState({
    city: '',
    state: '',
    zipCode: '',
    name: '',
    isAutoComplete: false,
  })

  const setSearch = ({ param }: IHooksParam) => {
    console.log('what is param recieved', param)
    const { id } = param
    const handleInputRecieved = () => {
      const { input } = param?.props!

      // if input recieved is from googleAutoComplete
      if (input?.adr_address!) {
        setInputProps((prevState) => ({
          isAutoComplete: true,
          input: param?.props?.input,
          prev: prevState.input,
        }))
      }
      // if input recieved is from pressing enter button
      if (!input?.adr_address!) {
        setInputProps((prevState) => ({
          isAutoComplete: false,
          input: param?.props?.input,
          prev: prevState.input.name,
        }))
      }
    }

    const dispatchAction = {
      inputEntered: handleInputRecieved,
    }
    return dispatchAction[id]()
  }

  /* -----  -----   ------  ------  ------  --------    ------- */

  const requestParam: IRequestParam = {
    isAutoComplete: null,
    name: null,

    city: null,
    state: null,
    zipCode: null,
  }

  const fetchSugestion = async (request: IRequestParam, name: string) => {
    dispatch(setIsLoading(true))

    const data = await axios.get(
      `http://localhost:3000/api/googleApis/suggestPlace`,
      { params: request }
    )
    console.log('did i come back with results?', data)
    const { routeTo } = data.data?.props

    if (!sessionStorage.history) {
      sessionStorage.setItem('history', JSON.stringify([]))
    }

    let history = JSON.parse(sessionStorage.history)

    console.log('what is the name', name)
    console.log('what is data', data)

    let updateState = {
      ...state,
      search: {
        ...state.search,
        value: name,
      },
      searchResults: {
        ...state.searchResults,
        city: data.data.props.cityName,
        state: data.data.props.stateName,

        data: {
          ...state.searchResults.data,
          props: {
            ...state.searchResults.data?.props,
            cityName: data.data.props.cityName,
            stateName: data.data.props.stateName,
            zipCode: data.data.props.zipCode,
            listings: data.data.props.listings || 'fooBar',
          },
        },
      },
    }

    if (history.length === 0) {
      history = [
        {
          url: buildUrlFilterString(state, routeTo).pathname,
          state: updateState,
        },
      ]
      sessionStorage.setItem('history', JSON.stringify(history))
    } else {
      history = [
        ...history,
        {
          url: buildUrlFilterString(state, routeTo).pathname,
          state: updateState,
        },
      ]
      sessionStorage.setItem('history', JSON.stringify(history))
    }

    router.push({
      pathname: buildUrlFilterString(state, routeTo).pathname,
      query: buildUrlFilterString(state, routeTo).query,
      // options:{foo: 'bar'}
    })

    //TODO: WIll need to have ability to make fetches for listings w/ existing filter buttons clicked
    //DO THAT HERE

    dispatch(fetchSugestionSuccess(data)) // w/o considering any filter buttons clicked
  }

  /* ----- Massage data recieved from GoogleAutoComplete Input Field ----- */
  const handleIsAutoComplete = (inputProps: IInputProps) => {
    /* EXTRACT CITY AND STATE VALUES FROM HTML STRING RETURNED FROM GOOGLE AUTO-COMPLETE  */
    const { adr_address } = inputProps?.input!
    const adr_address_chunks = adr_address.split(',')
    const formatCityStateZip = adr_address_chunks.map((chunk: string) => {
      // Grab the city
      if (containsSubString(chunk, 'locality')) {
        return [{ key: 'city', value: extractHTMLTagValue(chunk) }]
      }

      // if only zipCode was entered in the input, grab the zipCode and State
      if (
        containsSubString(chunk, 'region') &&
        containsSubString(chunk, 'postal-code')
      ) {
        const stateAndZip = extractHTMLTagValue(chunk)
          .split(' ')
          .filter((s: string) => s !== '')
        return [
          {
            key: 'zipCode',
            value: stateAndZip.filter((s) => isZipCode(s)).pop(),
          },
          {
            key: 'state',
            value: stateAndZip.filter((s) => !isZipCode(s)).pop(),
          },
        ]
      }

      // if no zipcode was entered, just grab the state
      if (containsSubString(chunk, 'region')) {
        return [{ key: 'state', value: extractHTMLTagValue(chunk) }]
      }

      return []
    })

    const cityStateZipObj = formatCityStateZip
      .flat()
      .reduce((obj, item) => ((obj[item.key] = item.value), obj), {})

    // /* MAKE API CALL WITH CITY AND STATE VALUES */
    const request = {
      ...requestParam,
      name: '',
      isAutoComplete: true,
      ...cityStateZipObj,
    }

    fetchSugestion(request)
  }

  const handleIsStandardSubmit = (inputProps: IInputProps) => {
    // get an autosugestion
    const { name } = inputProps?.input

    //step 1, see if the standard submit contains a zipCode
    const isZip = isZipCode(name)
    const hasZip = extractZipCodeFromString(name)
    const zip = isZip ? name : hasZip ? hasZip : ''

    const request = {
      ...requestParam,
      city: '',
      state: '',
      zipCode: zip,

      name: !isZip && !hasZip ? name : '',
      isAutoComplete: false,
    }
    //TODO: instead of fetching return it back to PropertySearchBar Comp and have
    // getServerSideProps do the fetching
    // return setAutoCompleteResp(request)
    fetchSugestion(request, name)
  }

  /* -----  ----- */
  useEffect(() => {
    // IS AUTOCOMPLETE RESULT && new input !== old input
    if (inputProps.isAutoComplete && inputProps.prev !== inputProps.input) {
      handleIsAutoComplete(inputProps)
    }

    // NOT AUTO COMPLETE && new input !== old input
    if (
      !inputProps.isAutoComplete &&
      inputProps.prev !== inputProps.input &&
      inputProps.input.name // prevents call being made on page load
    ) {
      handleIsStandardSubmit(inputProps)
    }
  }, [inputProps.prev, inputProps.input]) // when prev input or current input changes

  return { setSearch, autoCompleteResp }
}

export default useAutoComplete
