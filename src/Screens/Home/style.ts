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
  margin-bottom: ${RFValue(10)}px;
`;

export const ViewListEmptyComponent = styled.View`
  width: ${RFValue(20)}px;
`;

export const MainContent = styled.View`
  flex: 1;
  z-index: -10;
`;

export const BoxPopularMedia = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const ViewHeader = styled.View``;

export const ViewListGenres = styled.View`
  background-color: ${({theme}) => theme.colors.primaryColor}; 
  height: ${RFValue(30)}px;
`;

export const ViewListOptions = styled.View`
  height: ${RFValue(30)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const BoxLoadingList = styled.View`
  height: ${RFValue(80)}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;