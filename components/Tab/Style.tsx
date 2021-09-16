import styled from 'styled-components';

const Style = styled.div`
  width: 72px;
  height: 100vh;
  background: #0e1319;

  position: absolute;
  z-index: 9999;
  left: 0;

  .tab-item {
    height: 72px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }

    span {
      color: #fff;
    }
  }

  .tab-item-active {
    background: #293039;
  }
`;

export default Style;
