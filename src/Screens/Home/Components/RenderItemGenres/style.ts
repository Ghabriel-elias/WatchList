import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ContainerOptionsProps } from "./model";

export const ContainerOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<ContainerOptionsProps>`
  margin-right: ${RFValue(12)}px;
  height: ${RFValue(30)}px;
  padding: 0px ${RFValue(5)}px;
  justify-content: 'center';
  border-bottom-width: ${({selectedOption}) => selectedOption ? 4 : 0}px;
  border-bottom-color: ${({theme}) => theme.colors.secundaryColor}
`;