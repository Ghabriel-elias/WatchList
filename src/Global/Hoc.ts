import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

export const GlobalShadow = styled(LinearGradient).attrs({
  start: {x: 0,y:0},
  end: {x: 0,y:1},
  colors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']
})`
  width: 100%;
  height: 100%;
`;