import styled from "styled-components/native";
import themes from "../../../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";

const {colors} = themes

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryColor};
  padding: ${RFValue(16)}px;
`;