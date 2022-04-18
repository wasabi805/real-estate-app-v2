import styled from '@emotion/styled'

export const PriceContainer = styled.div`
  .price-filter-histogram {
    div: first-child {
      div[style] {
        //prevents infinite growth of height
        height: 12rem !important;
      }
    }
  }
`
interface IsilderProps {
  move: boolean
  value: string
}

export const PriceFilterContainer = styled.div`
  .price-filter-histogram {
    background: red;
  }

  // RangedSliderRow component class below
  .e1a75ba32 {
    .ant-slider {
      //min slider:
      div:nth-of-type(4) {
        background: ${(props) => (props?.moveMin?.move ? 'red' : 'green')};
        left: ${(props) => (props?.moveMin?.move ? props?.moveMin?.value : '')};
      }

      //max slider:
      div:nth-of-type(5) {
        background: ${(props) => (props?.moveMax?.move ? 'blue' : 'cyan')};
        left: ${(props: { moveMax: IsilderProps }) =>
          props?.moveMax?.move ? props?.moveMax?.value : ''};
      }
    }
  }
`

export const RangedSliderRow = styled.div`
  // width: 100%;
`
export const RangedSliderInputsRow = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 2em;

  .ant-input-number {
    width: 15rem;
  }
`

export const PriceSliderButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`
