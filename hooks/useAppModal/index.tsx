import React, { useContext } from 'react'
import AppContext from 'context/appContext'
import { IHooksParam } from 'hooks/interfaces'
import * as ModalActions from 'actions/modalActions'

const useAppModal = () => {
  const { state, dispatch } = useContext(AppContext)

  const activateModal = ({ param }: IHooksParam) => {
    const { id, props } = param
    return dispatch(ModalActions.activateModal(id, props?.renderModal!))
  }

  return { activateModal }
}

export default useAppModal
