import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
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

export const ViewHeader = styled.View`
  background-color: ${({theme}) => theme.colors.primaryColor}; 
`;

export const ViewListGenres = styled.View`
  background-color: ${({theme}) => theme.colors.primaryColor}; 
  height: ${RFValue(30)}px;
`;