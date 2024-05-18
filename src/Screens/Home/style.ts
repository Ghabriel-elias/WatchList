import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  /* padding: 0px 20px; */
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primaryColor};
`

export const ViewRenderItem = styled.View`
  width: ${RFValue(140)}px;
  height: ${RFValue(210)}px;
  background-color: red;
  margin-left: ${RFValue(20)}px;
  border-radius: ${RFValue(16)}px;
`;

export const MovieImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: ${RFValue(8)}px;
`;

export const TitlePopular = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family:${({theme}) => theme.fonts.poppinsSemiBold};
  color: ${({theme}) => theme.colors.lightColor};
`;

export const ViewTitle = styled.View`
  padding: 0px ${RFValue(30)}px;
  margin-bottom: ${RFValue(10)}px;
`;