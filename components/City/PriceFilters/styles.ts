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

      //PUT THE COMMENTED OUTCODE AT THE BOTTOM BELOW THIS LINE
      div:nth-of-type(4) {
        background: ${(props) => (props?.moveMin?.move ? 'red' : 'green')};
        left: ${(props: { moveMin: IsilderProps }) => {
          console.log('what is props in the styled component', props)
          return props?.moveMin?.move ? props?.moveMin?.value : ''
        }};
      }

      //min slider: max slider
      div:nth-child(5) {
        background: blue;
        // left: 75% !important;
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

// div:nth-child(4) {
//   background: ${props => props?.moveMin.move? 'red': 'green'};
//    left: ${(props: {moveMin: IsilderProps})=>{
//      console.log('what is props in the styled component', props)
//     return props?.moveMin.move ? props.moveMin.value: ''
//    }  };
// }
