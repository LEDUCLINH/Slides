import styled from 'styled-components';

interface Props {
  bg: any;
  width: any;
  height: any;
  index?: number;
}

const Style = styled.div<Props>`
  width: ${(props) => (props.width ? props.width : '100%')};
  /* max-width: ${(props) => (props.width ? props.width : '100%')}; */
  height: ${(props) => (props.height ? props.height : '100vh')};
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  #canvas-editor {
    background: ${(props) => (props.bg ? props.bg : '#edf0f2')};
  }

  #canvas-editor-${(props) => props.index && props.index} {
    background: ${(props) => (props.bg ? props.bg : '#117cc3')};
  }
`;

export default Style;
