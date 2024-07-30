import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import themes from "../../../../Global/themes";

const {colors} = themes

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${colors.lightColor};
  flex-direction: row;
  align-items: center;
`;

export const ViewInitialLetters = styled.View`
  height: ${RFValue(60)}px;
  width: ${RFValue(60)}px;
  border-radius: ${RFValue(50)}px;
  border-width: ${RFValue(1)}px;
  border-color: ${colors.lightColor};
  margin-right: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
`;
