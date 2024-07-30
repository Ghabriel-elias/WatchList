import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import themes from "../../../../Global/themes";

const {colors} = themes

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${colors.lightColor};
`;