import styled from "styled-components/native";
import { GlobalTextProps } from "./model";
import { RFValue } from "react-native-responsive-fontsize";
import themes from "../../Global/themes";

export const {colors, fonts} = themes

export const GlobalText = styled.Text<GlobalTextProps>`
  font-size: ${({fontSize}) => RFValue(Number(fontSize))}px;
  color: ${({color}) => colors[color]};
  line-height: ${({lineHeight, fontSize}) => RFValue(Number(lineHeight || fontSize + 2))}px;
  font-family: ${({fontFamily}) => fonts[fontFamily]};
  text-align: ${({textAlign}) => textAlign || 'left'};
  margin-top: ${({alignFontWithMargin}) => alignFontWithMargin ? 3 : 0}px;
`;