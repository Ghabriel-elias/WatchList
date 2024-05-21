import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerShow = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex: 0.33;
  margin-bottom: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
`;

export const ImageShow = styled.Image`
  height: ${RFValue(140)}px;
  border-radius: ${RFValue(8)}px;
`;