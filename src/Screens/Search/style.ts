import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export interface StyleRenderItemProps {
  selected: boolean;
} 

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primaryColor};
  flex: 1;
`;

export const BoxRenderItemCast = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  margin: ${RFValue(4)}px;
  flex: 1;
  margin-bottom: ${RFValue(10)}px;
`;

export const BoxCast = styled.View`
  margin-top: ${RFValue(8)}px;
  width: ${RFValue(80)}px;
`;

export const ImageCast = styled.Image`
  width: 100%;
  height: ${RFValue(100)}px;
  margin-right: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
`;

export const ButtonRenderItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
  })<StyleRenderItemProps>`
  background-color: ${({theme, selected}) => selected ? theme.colors.lightColor : theme.colors.transparent};
  padding: ${RFValue(8)}px 0px;
  width: ${RFValue(95)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(16)}px;
  margin-right: ${RFValue(20)}px;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  justify-content: center;
  padding: ${RFValue(20)}px;
  padding-bottom: ${RFValue(10)}px;
`;

export const BoxInput = styled.View``;

export const BoxHeaderList = styled.View`
  padding-bottom: ${RFValue(5)}px;
`;

export const BoxEmptyComponent = styled.View`
  height: ${RFValue(100)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const BoxLoadingList = styled.View`
  height: ${RFValue(80)}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;