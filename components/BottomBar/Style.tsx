import styled from 'styled-components';

const Style = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999999;
  background: #333;
  height: 60px;
  width: 100%;
  color: #fff;
  border-top: 1px solid #545252;
  font-weight: bold;

  .bottom-bar {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;
  }

  .backnext {
    display: flex;
    align-items: center;
  }

  .slide-len {
    height: 16px;
    margin: 0 5px;
  }
`;

export default Style;
