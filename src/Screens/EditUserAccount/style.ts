import styled from "styled-components/native";
import themes from "../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";

const {colors} = themes

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primaryColor};
  justify-content: space-between;
  padding: 0px ${RFValue(16)}px;
`;