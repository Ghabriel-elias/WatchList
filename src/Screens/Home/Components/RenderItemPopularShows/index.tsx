import { imageUrl } from "../../../../Global/imageUrl"
import { ShowProps } from "../../model"
import * as S from './style'

export const RenderItemPopularShows = (handleRenderItem: () => void) => {
  return ({item}: {item: ShowProps}) => (
    <S.ViewRenderItem onPress={handleRenderItem}>
      <S.MovieImage
        source={{uri: `${imageUrl}${item?.poster_path}`}}
        resizeMode="cover"
      />
    </S.ViewRenderItem>
  )
}