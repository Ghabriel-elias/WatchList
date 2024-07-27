import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import themes from "../../Global/themes";

const {colors} = themes

interface ButtonStyleProps {
  width?: number;
  color: keyof typeof colors;
  type: 'outline' | 'solid' | 'transparent';
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})<ButtonStyleProps>`
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(8)}px;
  width: ${({width}) => width || 100}%;
  justify-content: center;
  align-items: center;
  background-color: ${({color, type}) => type === 'solid' ? colors[color] : 'transparent'};
  border-width: ${({type}) => type === 'solid' || type === 'transparent' ? 0 : 1};
  border-color: ${({color}) => colors[color]};
`;