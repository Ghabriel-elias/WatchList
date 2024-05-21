import { imageUrl } from '../../../../Global/imageUrl'
import { ShowProps } from '../../model'
import * as S from './style'

export const RenderItemListShows = (handleRenderItem: () => void) => {
  return ({item}: {item: ShowProps}) => (
    <S.ContainerShow onPress={handleRenderItem}>
      <S.ImageShow
        resizeMode="cover"
        source={{uri: `${imageUrl}${item?.poster_path}`}}
      />
    </S.ContainerShow>
  )
}