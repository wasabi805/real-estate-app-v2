import styled from '@emotion/styled'

const SectionContainer = styled.div(({ backgroundImage, children }) => {
  return {
    background: 'lime',
    backgroundImage: `url(${backgroundImage.src})`,
    height: '400px',
  }
})

export default SectionContainer
