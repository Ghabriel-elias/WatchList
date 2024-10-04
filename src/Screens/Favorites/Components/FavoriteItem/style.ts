import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  flex-direction: row;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({theme}) => theme.colors.lightColor};
  padding: ${RFValue(16)}px 0px;
`;

export const FavoriteImage = styled.Image`
  height: ${RFValue(80)}px;
  width: ${RFValue(120)}px;
  border-radius: ${RFValue(8)}px;
  overflow: hidden;
`;

export const BoxTexts = styled.View`
  padding-left: ${RFValue(16)}px;
  justify-content: space-evenly;
  flex: 1;
`;