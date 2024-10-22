import {StackNavigationProp} from '@react-navigation/stack';
import { ShowProps } from '../Screens/Home/model';

export type RootStackParamList = {
  MediaHubDetails: ShowProps;
  Favorites: undefined;
  Search: undefined;
  PersonDetails: {
    id: number;
  };
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

declare module '@react-navigation/core' {
  export function useNavigation<T = NavigationProp>(): T;
}
declare module '@react-navigation/native' {
  export function useNavigation<T = NavigationProp>(): T;
}
