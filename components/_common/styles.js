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
  margin-right: 0.5em;

  .MAKETHISZINDEXLARGE {
  }

  // Tab button header
  [class^='ant-collapse-header'] {
    // background: yellowgreen;
    padding: 4px 5px !important;
    width: ${(props) => {
      return props?.buttonStyles?.width ? props.buttonStyles.width : '100%'
    }};

    //carrot
    div:nth-of-type(1) {
      position: absolute;
      right: 0;
      .ant-collapse-arrow {
        svg {
          transform: rotate(90deg);
        }
      }
    }
  }

  .ant-collapse {
    .ant-collapse-item {
      .ant-collapse-header {
        //TODO : Match color with ant library a theme you'll select later
        // color: #1890ff !important;
      }
      .ant-collapse-header: hover {
        color: #1890ff !important;
      }
    }
  }

  // Tab button
  div[class^='ant-collapse'] {
    // background: cyan;
    border-radius: 3px;
  }

  // Tab content
  div[class^='ant-collapse-content'] {
    position: absolute;
    z-index: 10;

    box-shadow: -0.8px 0.25px 3px 2.5px rgb(0 0 0 / 15%);
    background-color: #fff;
    font-size: 0.875rem;
    line-height: 1.25;

    font-weight: 400;
    color: #585858;
    border-radius: 2px;
  }

  .home-type-content {
    // RIGHT ALIGNMENT
    div[class^='ant-collapse-content-box'] {
      transform: translate(-66%, 0);
    }
  }
  .beds-bath-content {
    // RIGHT ALIGNMENT
    div[class^='ant-collapse-content-box'] {
      transform: translate(-70.5%, 0);
    }
  }
`

export const TileIconButton = styled.span`
  & button{
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 6rem;
    height: 6rem;
    line-height: 1.5rem;
    border-radius: 4px;
    font weight: 200;
  }

  

`

export const ButtonRowContainer = styled.div`
  display: flex;
  padding: 1rem 0 1rem 0;

  & button {
    width: ${(props) => {
      if (props?.buttonStyle?.width) {
        return props?.buttonStyle?.width
      }
      return ''
    }};

    height: ${(props) => {
      if (props?.buttonStyle?.height) {
        return props?.buttonStyle?.height
      }
      return ''
    }};
    margin: ${(props) => {
      switch (props.align) {
        case 'right':
          return '0px .25rem 0px 0px'
      }
      return '0'
    }};
  }
  justify-content: ${(props) => {
    switch (props.align) {
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      default:
        return 'flex-start'
    }
  }};
`
