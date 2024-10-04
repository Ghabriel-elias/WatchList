import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1; 
  background-color: ${({theme: {colors}}) => colors.primaryColor}; 
`;

export const Header = styled.View`
  height: ${RFValue(56)}px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  padding: 0px ${RFValue(10)}px;
  top: 0px;
  z-index: 2000;
`;

export const CoverImage = styled.Image`
  height: ${RFValue(200)}px;
  width: 100%;
`;

export const MovieInfo = styled.View`
  flex: 1;
  padding: ${RFValue(12)}px;
`;

export const BoxMediaHubPlayer = styled.View`
  flex: 1;
`;

export const BoxStar = styled.View`
  flex-direction: row; 
  align-items: center;
`;

export const BoxTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${RFValue(16)}px;
`;