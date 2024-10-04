import { RFValue } from "react-native-responsive-fontsize";
import * as S from './style'
import { RenderItemHorizontalList } from "./model";
import { GlobalSkeletonComponent } from "../../../../Components/GlobalSkeletonComponent";
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent";

export const RenderItemGenres = ({
  selectedOption,
  handleRenderItem,
  item,
  renderSkeleton
}: RenderItemHorizontalList) => 
(
  renderSkeleton ? (
    <GlobalSkeletonComponent
      customStyle={{
        marginRight: RFValue(12),
        height: RFValue(30),
        borderRadius: RFValue(4),
        width: RFValue(75),
      }}
    />
  ) : (
    <S.ContainerOption selectedOption={selectedOption?.id === item?.id}
    onPress={() => {
      handleRenderItem(item)
    }}>
      <GlobalTextComponent
        color={selectedOption?.id === item?.id ? "lightColor" : "secundaryColor"}
        fontFamily="poppinsMedium"
        fontSize={14}
        text={item?.name}
      />
    </S.ContainerOption>
  )
)
