import styled from '@emotion/styled'

interface IsilderProps {
  move: boolean
  value: string
}

export const PriceFilterContainer = styled.div`
  width: 30vw;
  padding: 0 2rem;
  padding-top: 1em;

  .eb7m8382 {
    .ant-slider {
      //min slider:
      div:nth-of-type(4) {
        background: ${(props) => (props?.moveMin?.move ? 'red' : 'green')};
        left: ${(props: { moveMin: IsilderProps }) => {
          console.log('what is props in the styled component', props)
          return props?.moveMin?.move ? props?.moveMin?.value : ''
        }};
      }

      //max slider:
      div:nth-of-type(5) {
        background: ${(props) => (props?.moveMax?.move ? 'blue' : 'cyan')};
        left: ${(props: { moveMax: IsilderProps }) => {
          console.log('what is props in the styled component', props)
          return props?.moveMax?.move ? props?.moveMax?.value : ''
        }};
      }
    }
  }
  border: 2px solid orange;
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
