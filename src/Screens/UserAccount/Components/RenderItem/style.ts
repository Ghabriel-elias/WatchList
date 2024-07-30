import styled from "styled-components/native";
import themes from "../../../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";

const {colors} = themes

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  height: ${RFValue(56)}px;
  margin-bottom: ${RFValue(8)}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${colors.lightColor};
  align-items: center;
`;

export const ViewIconText = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;