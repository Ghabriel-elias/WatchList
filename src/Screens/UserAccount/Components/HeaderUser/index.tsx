import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent'
import * as S from './style'

export const HeaderUser = ({
  userName
}: {userName: string}) => {
  return (
    <S.Container>
      <S.ViewInitialLetters>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={14}
          text={`${userName.substring(0,1)}${userName.split(' ')[1].substring(0, 1) || ''}`}
        />
      </S.ViewInitialLetters>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsRegular"
        fontSize={16}
        text={`Olá, seja bem vindo\n${userName}`}
        numberOfLines={3}
        style={{width: '80%'}}
      />
    </S.Container>
  )
}