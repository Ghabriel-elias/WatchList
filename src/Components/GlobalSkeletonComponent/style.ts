import styled from "styled-components/native";
import { GlobalSkeletonComponentProps } from "./model";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerSkeleton = styled.View<GlobalSkeletonComponentProps>`
  overflow: hidden;
  background-color: #a0a0a0 ;
`;