import { RFValue } from 'react-native-responsive-fontsize'
import { imageUrl } from '../../../../Global/imageUrl'
import { RenderItemPopularShowsProps, ShowProps } from '../../model'
import * as S from './style'
import { GlobalSkeletonComponent } from '../../../../Components/GlobalSkeletonComponent'
import { GlobalShadow } from '../../../../Global/Hoc'

export const RenderItemListShows = ({item, handleRenderItem, renderSkeleton}: RenderItemPopularShowsProps) => 
(
  renderSkeleton ? (
    <GlobalSkeletonComponent
      customStyle={{
        marginBottom: RFValue(10),
        flex: 0.33,
        height: RFValue(146),
        borderRadius: RFValue(8),
      }}
    />
  ) : (
    <S.ContainerShow onPress={handleRenderItem}>
      <S.ImageShow
        resizeMode="cover"
        defaultSource={require('../../../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${item?.poster_path}`}}>
        <GlobalShadow/>
      </S.ImageShow>
    </S.ContainerShow>
  )
)
