import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ViewListOptions = styled.View`
  background-color: ${({theme}) => theme.colors.primaryColor}; 
  height: ${RFValue(30)}px;
`;

export const ViewListEmptyComponent = styled.View`
  width: ${RFValue(20)}px;
`;