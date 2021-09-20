import styled from 'styled-components';

interface Props {
  bg: any;
}

const Style = styled.div<Props>`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  #canvas-editor {
    background: ${(props) => (props.bg ? props.bg : '#edf0f2')};
  }
`;

export default Style;
