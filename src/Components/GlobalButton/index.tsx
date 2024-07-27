import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import themes from "../../Global/themes";
import * as S from './style'
import { GlobalTextComponent } from "../GlobalTextComponent";
import { RFValue } from "react-native-responsive-fontsize";

const {colors, fonts} = themes

export interface GlobalButtonProps {
  text: string;
  color: keyof typeof colors;
  handleButton: () => void;
  type: 'outline' | 'solid' | 'transparent';
  width?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fontSize?: number;
  fontFamily?: keyof typeof fonts;
  fontColor?: keyof typeof colors;
  loading?: boolean;
}

export const GlobalButton = ({
  color,
  text,
  type,
  width,
  handleButton,
  style,
  textStyle,
  fontColor,
  fontFamily,
  fontSize,
  loading
}: GlobalButtonProps) => {
  return (
    <S.Container 
      width={width}
      color={color}
      type={type}
      onPress={handleButton}
      disabled={loading}
      style={style}>
        {loading ? (
          <ActivityIndicator size={RFValue(15)} color={colors.lightColor}/>
        ): (
          <GlobalTextComponent
            color={fontColor || 'lightColor'}
            fontFamily={fontFamily || 'poppinsRegular'}
            fontSize={fontSize || 15}
            text={text}
            style={textStyle}
          />
        )}
    </S.Container>
  )
}