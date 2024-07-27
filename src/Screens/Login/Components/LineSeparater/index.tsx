import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent'
import themes from '../../../../Global/themes'
import * as S from './style'

const {colors} = themes

export const LineSeparator = () => {
  return (
    <S.Container>
      <S.Line/>
      <S.BoxText>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          text="Ou"
          fontSize={11}
          textAlign="center"
          alignFontWithMargin
          style={{backgroundColor: colors.primaryColor, paddingHorizontal: 16}}
        />
      </S.BoxText>
    </S.Container>
  )
}