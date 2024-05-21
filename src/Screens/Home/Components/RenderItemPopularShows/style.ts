import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ViewRenderItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: ${RFValue(140)}px;
  height: ${RFValue(210)}px;
  background-color: red;
  margin-right: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
`;

export const MovieImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: ${RFValue(8)}px;
`;