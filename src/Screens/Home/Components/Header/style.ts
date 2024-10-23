import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  padding: ${RFValue(20)}px;
  padding-bottom: ${RFValue(10)}px;
`;

export interface StyleRenderItemProps {
  selected: boolean;
}

export const FakeInput = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  background-color: ${({theme}) => theme.colors.borderGenreColor};
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
  justify-content: center;
  padding-left: ${RFValue(16)}px;
`;

export const ButtonRenderItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<StyleRenderItemProps>`
  background-color: ${({theme, selected}) => selected ? theme.colors.lightColor : theme.colors.transparent};
  padding: ${RFValue(8)}px 0px;
  width: ${RFValue(90)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(16)}px;
  margin-right: ${RFValue(20)}px;
`;