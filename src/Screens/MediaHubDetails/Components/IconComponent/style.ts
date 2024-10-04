import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  height: 100%;
  justify-content: center;
`;

export const BoxIcon = styled.View`
  border-radius:  ${RFValue(25)}px;
  background-color: rgba(0,0,0,0.4);
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  justify-content: center;
  align-items: center;
`;