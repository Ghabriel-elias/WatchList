import { TextStyle } from "react-native";
import { DefaultTheme } from "styled-components/native";

export interface GlobalTextProps {
  text: string;
  fontSize: number;
  fontFamily: keyof DefaultTheme['fonts'];
  color: keyof DefaultTheme['colors'];
  lineHeight?: number;
  textAlign?: 'center' | 'right' | 'left';
  alignFontWithMargin?: boolean;
  style?: TextStyle;
  numberOfLines?: number;
  testId?: string;
}
