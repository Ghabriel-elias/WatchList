import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import themes from "../../../../Global/themes";

const {colors} = themes

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16)}px 0px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${colors.borderGenreColor};
  width: 100%;
`;

export const BoxText = styled.View`
  position: absolute;
  justify-Content: center;
  align-Items: center;
  width: 100%;
`;