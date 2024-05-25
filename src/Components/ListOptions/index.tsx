import { FlashList } from '@shopify/flash-list'
import * as S from './style'
import { RFValue } from 'react-native-responsive-fontsize';
import { RenderItemOptions } from '../RenderItemOptions';
import { ListOptionsProps } from './model';

export const ListOptions = ({
  data,
  estimatedItemSize,
  scrollEnabled,
  extraData,
  handleRenderItem,
  selectedOption,
  renderSkeleton
}: ListOptionsProps) => (
  <S.ViewListOptions>
    <FlashList
      scrollEnabled={scrollEnabled}
      estimatedItemSize={RFValue(estimatedItemSize)}
      extraData={extraData}
      data={data}
      estimatedListSize={{height: RFValue(30), width: data?.length * RFValue(estimatedItemSize)}}
      renderItem={({item}) => RenderItemOptions({item, handleRenderItem, renderSkeleton, selectedOption})}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: 25}}
      horizontal
      ListFooterComponent={<S.ViewListEmptyComponent/>}
    />   
  </S.ViewListOptions>
)