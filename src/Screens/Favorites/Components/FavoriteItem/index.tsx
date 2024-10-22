import dayjs from 'dayjs';
import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent';
import { imageUrl } from '../../../../Global/imageUrl';
import * as S from './style';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import themes from '../../../../Global/themes';
import { TouchableOpacity } from 'react-native';

interface FavoriteItemProps {
  item: any;
  handleRenderItem: () => void;
  formatInfo: (item: any) => string;
  handleExcludeFav: (item: any) => void;
}

export const FavoriteItem = ({item, handleRenderItem, formatInfo, handleExcludeFav}: FavoriteItemProps) => {
  return (
    <S.Container 
      onPress={handleRenderItem}>
      <S.FavoriteImage
        resizeMode="stretch"
        defaultSource={require('../../../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${item?.backdrop_path}`}}
      />
      <S.BoxTexts>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={14}
          text={item?.name || item?.title}
          numberOfLines={2}
        />
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          fontSize={10}
          text={formatInfo(item)}
          numberOfLines={2}
        />
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          fontSize={10}
          text={dayjs(item?.release_date || item?.first_air_date).format('YYYY')}
        />
      </S.BoxTexts>
      <S.ExcludeFavorite onPress={handleExcludeFav}>
        <Feather name='trash' size={RFValue(20)} color={themes.colors.secundaryColor}/>
      </S.ExcludeFavorite>
    </S.Container>
  )
}