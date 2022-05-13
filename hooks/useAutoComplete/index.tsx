import React, { useContext, useEffect, useState, useref, useRef } from 'react'
import AppContext from 'context/appContext'
import axios from 'axios'
import { IHooksParam } from '@hooks/interfaces'
import useAppModal from '@hooks/useAppModal'
import { containsSubString, extractHTMLTagValue } from 'utils'

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
  }

  const { state, dispatch } = useContext(AppContext)
  const { activateModal } = useAppModal()
  const [inputProps, setInputProps] = useState<IInputProps>({
    isAutoComplete: null,
    input: {
      name: null,
    },
    prev: null,
  })

  interface TPrevStae {}
  const prevInput = useRef<TPrevStae>({
    current: {
      input: {},
    },
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
  }

  const fetchSugestion = async (request: IRequestParam) => {
    console.log('what is requestObbj', request)
    await axios
      .get(`http://localhost:3000/api/googleApis/suggestPlace`, {
        params: request,
      })
      .then((response) => {
        console.log('what is the response', response)
      })
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

    const formatCityAndState = adr_address_chunks
      .map((chunk: string) => {
        if (containsSubString(chunk, 'locality')) {
          return { city: extractHTMLTagValue(chunk) }
        }
        if (containsSubString(chunk, 'region')) {
          return { state: extractHTMLTagValue(chunk) }
        }
        return {}
      })
      .filter((obj) => Object.keys(obj).length > 0)

    const cityStateObj = Object.assign({}, ...formatCityAndState)

    /* MAKE API CALL WITH CITY AND STATE VALUES */
    const request = {
      ...requestParam,
      name: '',
      isAutoComplete: true,
      ...cityStateObj,
    }

    fetchSugestion(request)
  }

  const handleIsStandardSubmit = (inputProps: IInputProps) => {
    // get an autosugestion
    const { name } = inputProps?.input

    const request = {
      ...requestParam,
      city: '',
      state: '',

      name: name,
      isAutoComplete: false,
    }
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

  return { setSearch }
}

export default useAutoComplete
