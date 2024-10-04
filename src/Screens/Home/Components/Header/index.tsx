import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent'
import * as S from './style';
import {FlatList} from 'react-native'
import { HeaderHomeProps } from '../../types';

export const HeaderHome = ({
  handleRenderItem,
  selectedShow,
  listOfShows
}: HeaderHomeProps) => {

  return (
    <S.Container>
      <S.FakeInput activeOpacity={0.5}>
        <GlobalTextComponent
          color='lightColor'
          fontFamily='poppinsLight'
          fontSize={11}
          text='Buscar...'
        />
      </S.FakeInput>
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