import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent'
import * as S from './style';
import {FlatList} from 'react-native'
import { HeaderHomeProps } from '../../model';

export const HeaderHome = ({
  handleRenderItem,
  selectedShow,
  listOfShows
}: HeaderHomeProps) => {

  return (
    <S.Container>
      <GlobalTextComponent
        color='lightColor'
        fontFamily='poppinsSemiBold'
        fontSize={18}
        text='O que você quer assistir hoje?'
        style={{marginBottom: 10}}
      />
      <FlatList
        data={listOfShows}
        horizontal
        renderItem={({item}) => (
          <S.ButtonRenderItem
          selected={selectedShow.id === item.id}
          onPress={() => {
            handleRenderItem(item)
          }}>
            <GlobalTextComponent
              color={selectedShow?.id === item?.id ? 'darkColor' : 'lightColor'}
              fontFamily='poppinsMedium'
              fontSize={12}
              text={item.name}
            />
          </S.ButtonRenderItem>
        )}
      />
    </S.Container>
  )
}