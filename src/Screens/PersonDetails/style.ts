import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primaryColor};
`;

export interface StyleRenderItemProps {
  selected: boolean;
} 

export const ButtonRenderItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
  })<StyleRenderItemProps>`
  background-color: ${({theme, selected}) => selected ? theme.colors.lightColor : theme.colors.transparent};
  padding: ${RFValue(8)}px 0px;
  width: ${RFValue(100)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(16)}px;
  margin-right: ${RFValue(20)}px;
`;