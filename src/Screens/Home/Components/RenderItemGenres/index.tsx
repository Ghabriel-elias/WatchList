import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent"
import { GenreProps, RenderItemGenresProps } from "../../model";
import * as S from './style'

export const RenderItemGenres = ({
  selectedTypeOfShow,
  selectedGenre,
  getMoviesByGenreId
}: RenderItemGenresProps) => {
  return ({item}: {item: GenreProps}) => (
    <S.ContainerGenre selectedGenre={selectedGenre?.id === item?.id} onPress={() => {
      getMoviesByGenreId(item, selectedTypeOfShow?.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
    }}>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsMedium"
        fontSize={14}
        text={item?.name}
      />
    </S.ContainerGenre>
  )
}