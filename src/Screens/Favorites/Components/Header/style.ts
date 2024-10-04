import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: ${RFValue(46)}px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({theme}) => theme.colors.lightColor};
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  height: 100%;
  justify-content: center;
  width: ${RFValue(60)}px;
  padding-left: ${RFValue(10)}px;
`;

export const BoxIcon = styled.View`
  border-radius: ${RFValue(25)}px;
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  justify-content: center;
  align-items: center;
`;

export const BoxTitle = styled.View`
  position: absolute;
  width: 100%;
  z-index: -100;
`;