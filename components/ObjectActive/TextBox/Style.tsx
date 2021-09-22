import styled from 'styled-components'

const Style = styled.div`
  display: flex;

  .text__content {
    border-radius: 5px;
  }

  .text__fontFamily .ant-select-selector {
    margin-left: 10px;
    border-radius: 5px;
  }

  .text__align {
    display: flex;
    align-items: center;
    margin: 0 10px;

    span {
      cursor: pointer;
      padding: 3px 4px;
      border-radius: 4px;
      &.active {
        background-color: #000;
        color: #fff;
      }
    }
  }

  .text__color {
    position: relative;
    line-height: 25px;

    .color__absolute {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .group__ctrl {
    margin-left: 10px;
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
    }
  }
`

export default Style