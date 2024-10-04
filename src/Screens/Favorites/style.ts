import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primaryColor};
`;

export const MainContent = styled.View`
  padding: ${RFValue(10)}px;
  padding-top: 0px;
  flex: 1;
`;

export const BoxListEmpty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;