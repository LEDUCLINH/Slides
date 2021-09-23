import styled from 'styled-components';

const Style = styled.div`
  display: flex;

  .text__content {
    border-radius: 5px;
    margin: 0 10px;
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
      margin: 0 10px;

      &.active {
        background-color: #000;
        color: #fff;
      }
    }
  }

  .text__color {
    position: relative;
    line-height: 25px;
    cursor: pointer;
    min-width: 25px;

    .color__absolute {
      position: absolute;
      top: 10px;
      left: 0;
      min-width: 25px;
    }
  }

  .group__ctrl {
    margin-left: 10px;
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
      margin: 0 10px;
    }
  }
`;

export default Style;
