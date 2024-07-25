import styled from "styled-components/native";
import themes from "../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";
import { Animated } from "react-native";

const {colors, fonts} = themes

export const Container = styled.View`
  background-color: ${colors.borderGenreColor};
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(8)}px;
  padding: 0px ${RFValue(16)}px;
`;

export const AnimatedLabel = styled(Animated.View)`
  padding-left: ${RFValue(16)}px;
  z-index: 0px;
  height: 100%;
  width: 100%;
  position: absolute;
`;

interface InputProps {
  showLabel: boolean;
}

export const Input = styled.TextInput<InputProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${fonts.poppinsRegular};
  z-index: ${RFValue(10)}px;
  width: 100%; 
  height: 100%; 
  justify-content: center; 
  align-items: center;
  padding-top: ${({showLabel}) => RFValue(showLabel ? 25 : 5)}px;
  padding-left: 0px;
`;