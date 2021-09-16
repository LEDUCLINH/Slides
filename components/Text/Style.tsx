import styled from 'styled-components';

const Style = styled.div`
  height: 100%;
  ul {
    height: 100%;
    overflow-y: scroll;
    padding: 0;
    margin: 0;
    ::-webkit-scrollbar {
      width: 2px;
    }
    li {
      list-style: none;
      text-align: start;
      cursor: pointer;
      border: 1px solid #414a57;
      background: #293039;
      margin-bottom: 0;
      padding: 14px 16px;
      h2 {
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        font-size: 24px;
        line-height: 36px;
        overflow: hidden;
        color: #fff;
      }
      p {
        font-size: 16px;
        line-height: 20px;
        color: #b3b3b3;
        overflow: hidden;
        margin-bottom: 5px;
      }
    }
  }
`;

export default Style;
