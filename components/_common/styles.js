import React from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

export const formInputStyles = css({
  display: 'block',
})

const FormLabel = styled.label``
export const ModalFormLabel = ({ text }) => {
  return <FormLabel>{text}</FormLabel>
}

//TODO: will accept props for right side alignent
export const DropdownButtonContainer = styled.div`
  position: relative;

  // Tab button header
  [class^='ant-collapse-header'] {
    background: yellowgreen;
    padding: 4px 0px !important;
    width: ${(props) => {
      return props?.buttonStyles?.width ? props.buttonStyles.width : '100%'
    }};
  }

  // Tab button
  div[class^='ant-collapse'] {
    background: cyan;
  }

  // Tab content
  div[class^='ant-collapse-content'] {
    background: lightgray;
    position: absolute;
  }

  // RIGHT ALIGNMENT
  div[class^='ant-collapse-content-box'] {
    transform: translate(-69%, 0);
  }
`
