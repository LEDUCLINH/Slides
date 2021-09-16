import styled from 'styled-components';

const Style = styled.div`
  .canvas-fill {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    background: ${(props) => props.color && props.color};
    border: 3px solid powderblue;

    .color-icon {
      width: 28px;
      height: 28px;
    }
  }
`;

export default Style;
