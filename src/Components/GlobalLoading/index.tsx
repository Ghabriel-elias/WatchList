import { RFValue } from 'react-native-responsive-fontsize'
import themes from '../../Global/themes'
import * as S from './style'

export const GlobalLoading = () => {
  return (
    <S.Container>
      <S.Loading color={themes.colors.secundaryColor} size={RFValue(30)}/>
    </S.Container>
  )
}