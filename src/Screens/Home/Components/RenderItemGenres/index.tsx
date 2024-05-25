import { RFValue } from "react-native-responsive-fontsize";
import { GlobalSkeletonComponent } from "../../../../Components/GlobalSkeletonComponent";
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent"
import { RenderItemGenresProps } from "../../model";
import * as S from './style'

export const RenderItemGenres = ({
  selectedTypeOfShow,
  selectedGenre,
  getMoviesByGenreId,
  item,
  renderSkeleton
}: RenderItemGenresProps) => 
(
  renderSkeleton ? (
    <GlobalSkeletonComponent
      customStyle={{
        marginRight: RFValue(12),
        height: RFValue(30),
        width: RFValue(70),
      }}
    />
  ) : (
    <S.ContainerGenre selectedGenre={selectedGenre?.id === item?.id} onPress={() => {
      getMoviesByGenreId(item, selectedTypeOfShow?.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
    }}>
      <GlobalTextComponent
        color={selectedGenre?.id === item?.id ? "secundaryColor" : "lightColor"}
        fontFamily="poppinsMedium"
        fontSize={14}
        text={item?.name}
      />
    </S.ContainerGenre>
  )
)
