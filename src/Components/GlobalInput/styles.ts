import styled from "styled-components/native";
import themes from "../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";
import { Animated } from "react-native";

const {colors, fonts} = themes

export const Container = styled.View`
  background-color: ${colors.borderGenreColor};
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(8)}px;
  padding-left: ${RFValue(16)}px;
  flex-direction: row;
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
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(14)}px;
  font-family: ${fonts.poppinsRegular};
  color: ${colors.lightColor};
  z-index: ${RFValue(10)}px;
  height: 100%; 
  flex: 1;
  justify-content: center; 
  align-items: center;
  margin-top: ${({showLabel}) => RFValue(showLabel ? 10 : 2)}px;
  padding-left: 0px;
`;

export const BoxEyeInput = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  width: 16%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  padding-right: ${RFValue(16)}px;
`;