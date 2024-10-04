import { RFValue } from "react-native-responsive-fontsize"
import { GlobalSkeletonComponent } from "../../../../Components/GlobalSkeletonComponent"
import { imageUrl } from "../../../../Global/imageUrl"
import { RenderItemPopularShowsProps } from "../../model"
import * as S from './style'
import { GlobalShadow } from "../../../../Global/Hoc"

export const RenderItemPopularShows = ({item, handleRenderItem, renderSkeleton}: RenderItemPopularShowsProps) => 
(
  renderSkeleton ? (
    <GlobalSkeletonComponent
      customStyle={{
        height: RFValue(210),
        width: RFValue(140),
        marginRight: RFValue(10),
        borderRadius: RFValue(8),
      }}
    />
  ): (
    <S.ViewRenderItem onPress={() => {
      handleRenderItem(item)
    }}>
      <S.MovieImage
        defaultSource={require('../../../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${item?.poster_path}`}}
        resizeMode="cover">
        <GlobalShadow/>
      </S.MovieImage>
    </S.ViewRenderItem>
  )
)