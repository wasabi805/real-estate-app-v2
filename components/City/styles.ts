import styled from '@emotion/styled'
import { Row, Col } from 'antd'

export const ListingsContainer = styled.div`
  // background: #e2e2e8;
  display: flex;
  flex-direction: column;

  .ant-col {
    // Styling below overides the default left alignment of tabs from Ant Design componet library that uses inline style tags within the library.
    .photo-and-table-tab {
      // height: 45vh;
      .ant-tabs-nav {
        .ant-tabs-nav-wrap {
          // Overrides the Ant design library style tag placement of tabs
          div[style] {
            transform: translate(30vw, 0px) !important;
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

  .listings-card-col {
    .ant-tabs {
      .ant-tabs-content-holder {
        // overflow-y: scroll;
        // height: 78vh;
      }
    }
  }
`

export const SortByOptionsContainer = styled.div`
  display: flex;
  border: 1px solid cyan;

  // | -------ORIGINAL BELOW ------- |
  // display: flex;
  // flex-direction: row;
  // height: 3rem;
  // width: 100%;
  // margin-bottom: 1rem;
  // border-bottom: 1px solid #8080800f;

  // .photo-tables-buttons {
  //   margin-left: auto;
  //   margin-right: 1rem;
  //   align-self: flex-end;

  //   & button {
  //     border: none;
  //     background: transparent;
  //     font-size: 1.1rem;
  //     font-weight: 400;
  //     cursor: pointer;
  //   }
  // }
`

export const SpecRowTwo = styled(Row)`
  .spec-col-two {
  }
  .baths {
    padding: 0 1em;
  }

  .sq-ft {
  }
`

export const ListingsTableContainer = styled.div`
  // This is to hide the radio button within the table
  //  TODO come back here later to change the font and colors for the

  .ant-table-wrapper {
    // height: 45vh;
    // overflow: hidden;
    // overflow-y: scroll;

    .ant-spin-nested-loading {
      .ant-spin-container {
        .ant-table {
          .ant-table-container {
            .ant-table-content {
              & table {
                .ant-table-thead > tr > th {
                  //  This is to hide the radio button within the header
                  //  TODO come back here later to change the font and colors for the header
                  .ant-checkbox {
                    visibility: hidden;
                  }
                  // display: none;
                }

                .ant-table-tbody {
                  &:hover {
                    cursor: pointer;
                  }
                  & tr {
                    & td {
                      .ant-checkbox-wrapper {
                        visibility: hidden;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const SpecColTwo = styled(Row)``

export const SelectedHomesContainer = styled.div`
  width: 100%;

  #fixed-listing-header {
    .edvbjrl3 {
      .ant-table-wrapper {
        height: 6vh;
        .ant-spin-nested-loading {
          .ant-spin-container {
            ul {
              display: none;
            }

            .ant-table {
              .ant-table-container {
                .ant-table-content {
                  table {
                    .ant-table-tbody {
                      visibility: hidden;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ListingCardsAndTableCol = styled(Col)`
  overflow-y: scroll;
  height: 100vh;

  #scrollable-listing-body {
    .edvbjrl3 {
      .ant-table-wrapper {
        height: 40vh;
        overflow: hidden;
        overflow-y: scroll;
        .ant-spin-nested-loading {
          .ant-spin-container {
            .ant-table {
              .ant-table-container {
                .ant-table-content {
                  table {
                    .ant-table-thead {
                      display: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
