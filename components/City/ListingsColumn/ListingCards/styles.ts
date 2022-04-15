import styled from '@emotion/styled'

export const ListingsCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .listing-card {
    flex: 1 1 18rem;
    margin: 0.5em;
  }

  [class^='ant-card-cover'] {
    img {
      width: 100%;
      height: 13vw;
      object-fit: cover;
    }
  }
`
