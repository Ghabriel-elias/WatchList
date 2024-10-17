import { RFValue } from 'react-native-responsive-fontsize'
import * as S from './style'
import themes from '../../../../Global/themes';
import {MaterialCommunityIcons} from '@expo/vector-icons'

const {colors} = themes

interface IconComponentProps {
  handleButton: () => void;
  iconName: string;
}

export const IconComponent = ({handleButton, iconName}: IconComponentProps) => (
  <S.Container onPress={handleButton}>
    <S.BoxIcon>
      <MaterialCommunityIcons name={iconName} size={RFValue(23)} color={colors.lightColor}/>
    </S.BoxIcon>
  </S.Container>
)