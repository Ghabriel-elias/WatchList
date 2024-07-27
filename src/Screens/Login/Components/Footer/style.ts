import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerFooter = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${RFValue(16)}px;
  justify-content: space-between;
`;