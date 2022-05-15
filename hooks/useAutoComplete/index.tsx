import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'context/appContext'
import axios from 'axios'
import { IHooksParam } from '@hooks/interfaces'
import useAppModal from '@hooks/useAppModal'
import * as GlobalActions from 'actions/GlobalActions'
import * as PropertySearchBarActions from 'actions/propertySearchBarActions'
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

  const { setIsLoading } = GlobalActions
  const { fetchSugestionSuccess } = PropertySearchBarActions

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

  const fetchSugestion = async (request: IRequestParam) => {
    console.log('what is requestObbj', request)
    dispatch(setIsLoading(true))
    // const realtorRequest = {
    //     city,
    //     state,
    //     zipCode
    // }

    const x = await axios.get(
      `http://localhost:3000/api/googleApis/suggestPlace`,
      { params: request }
    )
    console.log('test', x)

    //call realtor api with params from x
    const z = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    console.log('test2', z)

    //   .then( async(response) => {
    //     try{
    //         console.log('what is the response', response)
    //         // call realtor api with data from auto complete hook
    //         const { city, state, zipCode } = response?.data!
    //         const request ={
    //             city,
    //             state,
    //             zipCode
    //         }

    //         const res =  await axios.get('http://localhost:3000/api/getListings', {
    //           params: {
    //             request
    //           },
    //         })

    //         console.log('what are the listings', res)

    //         // update state with response
    //         // dispatch(fetchSugestionSuccess(someData))

    //     }catch(error){
    //         console.log('Error Occured Fetching Listings Data')
    //     }

    //   })

    dispatch(setIsLoading(false))
  }

  /* ----- Massage data recieved from GoogleAutoComplete Input Field ----- */
  const handleIsAutoComplete = (inputProps: IInputProps) => {
    //the plan,
    //step 1 get the auto complete suggestions from api
    //step 2 update the reducer state with the suggestion( for things like updating the input field and to display specic search modal if needed )
    //step 3 determine if route to state page or city page

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
    fetchSugestion(request)
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
