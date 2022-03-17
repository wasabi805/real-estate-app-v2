import styled from '@emotion/styled'

export const ListingsContainer = styled.div`
  // background: #e2e2e8;
  display: flex;
  border: 2px solid magenta;

  .ant-col {
    // Styling below overides the default left alignment of tabs from Ant Design componet library that uses inline style tags within the library.
    .photo-and-table-tab {
      .ant-tabs-nav {
        .ant-tabs-nav-wrap {
          // Overrides the Ant design library style tag placement of tabs
          div[style] {
            transform: translate(38vw, 0px) !important;
          }

          // Overrides the Ant design library style tag placement of the ink tab when a tab is selected
          .ant-tabs-nav-list {
            .ant-tabs-ink-bar {
              div[style] {
                left: -500px !important;
              }
              transform: translate(0vw, 0px) !important;
            }
          }
        }
      }
    }
  }
`

export const SortByOptionsContainer = styled.div`
  position: absolute;
  z-index: 100;
`
