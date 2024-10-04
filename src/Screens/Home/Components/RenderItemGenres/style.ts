import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerOptionsProps } from "./model";

export const ContainerOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<ContainerOptionsProps>`
  margin-right: ${RFValue(8)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(8)}px;
  padding: 0px ${RFValue(10)}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.secundaryColor};
  background-color: ${({theme, selectedOption}) => selectedOption ? theme.colors.secundaryColor : theme.colors.primaryColor};
`;