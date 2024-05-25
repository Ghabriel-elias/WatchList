import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerShow = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex: 1;
  border-radius: ${RFValue(8)}px;
  margin: ${RFValue(4)}px;
`;

export const ImageShow = styled.ImageBackground`
  height: ${RFValue(140)}px;
  border-radius: ${RFValue(8)}px;
  overflow: hidden;
`;