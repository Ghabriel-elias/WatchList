import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import themes from "../../../../Global/themes"
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent"
import * as S from './style'

interface RenderItemProps {
  id: number;
  name: string;
  icon: string;
  handleRenderItem: () => void;
}

export const RenderItem = ({item}: {item: RenderItemProps}) => {

  const {colors} = themes

  return (
    <S.Container onPress={item.handleRenderItem}>
      <S.ViewIconText>
        <Feather name={item.icon} color={colors.lightColor} size={18}/>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={14}
          text={item.name}
          alignFontWithMargin
          style={{marginLeft: 16}}
        />
      </S.ViewIconText>
      <MaterialIcons name="arrow-forward-ios" size={20} color={colors.lightColor} />
    </S.Container>
  )
}