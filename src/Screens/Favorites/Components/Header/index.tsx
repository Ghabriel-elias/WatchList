import themes from '../../../../Global/themes';
import * as S from './style'
import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent';

interface HeaderProps {
  handleButton: () => void;
  title: string;
} 

export const Header = ({title}: HeaderProps) => {
  return (
    <S.Container>
      <S.BoxTitle>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={17}
          text={title}
          textAlign="center"
          alignFontWithMargin
        />
      </S.BoxTitle>
    </S.Container>
  )
}