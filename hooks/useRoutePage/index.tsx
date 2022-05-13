import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppContext from 'context/appContext'
import * as SearchActions from 'actions/propertySearchBarActions'
import * as FetchActions from 'actions/FetchActions'
import { IHooksParam } from 'utils/interfaces/hooks'
import { STATE_PAGE, CITY_PAGE } from 'utils/contants'

const { onFetchSuccess } = FetchActions

const { updateStateWithSearchResults } = SearchActions

const useRoutePage = () => {
  const { state, dispatch } = useContext(AppContext)
  const router = useRouter()
  const [route, setRoute] = useState('/')

  const routeTo = ({ param }: IHooksParam) => {
    const { id, props } = param
    console.log('WHAT IS PARAM', param)
    console.log('what is {id, props}', { id, props })

    const handleCityPage = () => {
      const { data, city, state } = props!
      // dispatch(updateStateWithSearchResults({data, city, state}))
    }

    const routePaths = {
      cityPage: () => alert('i work'),
      test: () => console.log('state at hook', state),
    }

    alert('not busted')
    // return routePaths[id]()
  }

  useEffect(() => {
    if (state.fetchProperty) {
      alert('changed')
      console.log('what is route', route)
      router.push(route)
    }
  }, [state.fetchProperty])

  return { routeTo }
}

export default useRoutePage
