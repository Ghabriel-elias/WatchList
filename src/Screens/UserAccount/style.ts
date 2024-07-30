import styled from "styled-components/native";
import themes from "../../Global/themes";

const {colors} = themes

export const Container = styled.SafeAreaView`
  background-color: ${colors.primaryColor};
  flex: 1;
`;