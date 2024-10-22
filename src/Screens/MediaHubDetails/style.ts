import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1; 
  background-color: ${({theme: {colors}}) => colors.primaryColor}; 
`;

export const Header = styled.View`
  height: ${RFValue(56)}px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  padding: 0px ${RFValue(10)}px;
  top: 0px;
  z-index: 2000;
`;

export const BoxListTrailers = styled.View`
  width: 100%;
  height: ${RFValue(135)}px;
`;

export const BoxTrailers = styled.View`
  margin-right: ${RFValue(10)}px;
`;

export const BoxRenderItemCast = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  height: ${RFValue(130)}px;
  width: ${RFValue(90)}px;
`;

export const ImageWatchProvider = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  margin-right: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
`;

export const CoverImage = styled.Image`
  height: ${RFValue(200)}px;
  width: 100%;
`;

export const MovieInfo = styled.View`
  flex: 1;
  padding: ${RFValue(12)}px;
`;

export const BoxListWatchProvider = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const ImageCast = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  margin-right: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
`;

export const BoxCast = styled.View`
  margin-top: ${RFValue(8)}px;
  width: ${RFValue(80)}px;
`;

export const BoxMediaHubPlayer = styled.View`
  flex: 1;
`;

export const BoxStar = styled.View`
  flex-direction: row; 
`;

export const BoxTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${RFValue(16)}px;
`;