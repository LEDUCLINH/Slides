import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;

  .preview {
    cursor: pointer;
  }

  .tool-fill {
    position: relative;
    top: -46px;
  }

  .canvas-fill {
    cursor: pointer;
    background: ${(props) => props.color && props.color};
    border: 3px solid powderblue;
    top: 30px;
    position: absolute;
    right: 0px;

    .color-icon {
      width: 28px;
      height: 28px;
    }
  }
`;

export default Style;
