import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  /* flex: 1; */
  background-color: ${({theme}) => theme.colors.primaryColor};
`

export const TitlePopular = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family:${({theme}) => theme.fonts.poppinsSemiBold};
  color: ${({theme}) => theme.colors.lightColor};
`;

export const ViewTitle = styled.View`
  padding: 0px ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const ViewListEmptyComponent = styled.View`
  width: ${RFValue(20)}px;
`;