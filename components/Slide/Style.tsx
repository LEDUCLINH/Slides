import styled from 'styled-components';

const Style = styled.div`
  width: calc(100vw - 422px);
  height: 100px;
  background: #fff;

  position: absolute;
  z-index: 999;
  bottom: 0;
  right: 0;

  .slide-wrap {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
    flex-wrap: nowrap;

    overflow: scroll;
    padding-bottom: 20px;
    background-color: #b7b7b7;
  }

  .slide-item {
    box-shadow: 0 0 0 1px rgb(68 92 116 / 2%), 0 2px 8px rgb(57 76 96 / 15%);
    width: 85px;
    height: 48px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;

    .slide-item-icon {
      display: none;
    }
    .canvas__realtime {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover {
      .slide-item-icon {
        margin-top: 4px;
        background: #d5d5d5;
        width: 30px;
        border-radius: 6px;
        display: flex;
        padding: 2px 6px;
        position: absolute;
        right: 10px;
        top: 0px;
      }
    }
  }

  .slide-item-active {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #7d2ae8;
  }

  .slide-item-final {
    background: rgba(64, 87, 109, 0.07);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #333;

    &:hover {
      background: #e1e4e7;
    }
  }
`;

export default Style;
