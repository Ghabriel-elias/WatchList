import { RFValue } from 'react-native-responsive-fontsize'
import { imageUrl } from '../../../../Global/imageUrl'
import { RenderItemPopularShowsProps } from '../../model'
import * as S from './style'
import { GlobalSkeletonComponent } from '../../../../Components/GlobalSkeletonComponent'
import { GlobalShadow } from '../../../../Global/Hoc'

export const RenderItemListShows = ({item, handleRenderItem, renderSkeleton}: RenderItemPopularShowsProps) => 
(
  renderSkeleton ? (
    <GlobalSkeletonComponent
      customStyle={{
        flex: 1,
        height: RFValue(146),
        borderRadius: RFValue(8),
        margin: RFValue(4),
      }}
    />
  ) : (
    <S.ContainerShow onPress={() => handleRenderItem(item)}>
      <S.ImageShow
        resizeMode="cover"
        defaultSource={require('../../../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${item?.poster_path}`}}>
        <GlobalShadow/>
      </S.ImageShow>
    </S.ContainerShow>
  )
)
