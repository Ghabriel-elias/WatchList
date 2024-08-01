import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import themes from "../../../Global/themes";

const {colors} = themes

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryColor};
  padding: ${RFValue(16)}px;
`;