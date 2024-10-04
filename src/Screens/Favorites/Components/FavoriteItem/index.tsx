import dayjs from 'dayjs';
import { GlobalTextComponent } from '../../../../Components/GlobalTextComponent';
import { imageUrl } from '../../../../Global/imageUrl';
import * as S from './style';

interface FavoriteItemProps {
  item: any;
  handleRenderItem: () => void;
  formatInfo: (item: any) => string;
}

export const FavoriteItem = ({item, handleRenderItem, formatInfo}: FavoriteItemProps) => {
  return (
    <S.Container 
      onPress={handleRenderItem}>
      <S.FavoriteImage
        resizeMode="cover"
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
    </S.Container>
  )
}