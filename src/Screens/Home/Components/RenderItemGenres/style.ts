import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerGenreProps {
  selectedGenre: boolean;
}

export const ContainerGenre = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<ContainerGenreProps>`
  margin-right: ${RFValue(12)}px;
  height: ${RFValue(30)}px;
  padding: 0px ${RFValue(5)}px;
  justify-content: 'center';
  border-bottom-width: ${({selectedGenre}) => selectedGenre ? 4 : 0}px;
  border-bottom-color: ${({theme}) => theme.colors.borderGenreColor}
`;