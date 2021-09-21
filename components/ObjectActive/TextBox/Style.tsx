import styled from 'styled-components'

const Style = styled.div`
  display: flex;

  .text__align {
    display: flex;
    align-items: center;

    span {
      cursor: pointer;

      &.active {
        background-color: #c2c2c2;
      }
    }
  }
`

export default Style