import styled from '@emotion/styled'

const SectionContainer = styled.div(({ backgroundImage, children }) => {
  return {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35rem',
    border: '1px solid magenta',
  }
})

export default SectionContainer
