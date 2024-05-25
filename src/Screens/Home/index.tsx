import { ActivityIndicator, Dimensions, View} from "react-native"
import { RenderItemListShows } from "./Components/RenderItemListShows";
import themes from "../../Global/themes";
import { FlashList } from "@shopify/flash-list";
import { useHomeViewModel } from "./viewModel";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { ListOptions } from "../../Components/ListOptions";

export const Home = () => {
  const {
    changeTypeOfShow,
    selectedTypeOfShow,
    genres,
    genreItemSize,
    dataGenres,
    listOfShows,
    dataShows,
    showItemSize,
    handleEndReached,
    loadingMovieList,
    selectedGenre,
    listOfTypeShows,
    getMoviesByGenreId,
    handleNavigateShowDetails
  } = useHomeViewModel()

  return (
    <S.Container>
      <S.ViewHeader>
        <HeaderHome
          handleRenderItem={changeTypeOfShow}
          listOfShows={listOfTypeShows}
          selectedShow={selectedTypeOfShow}
        />
      </S.ViewHeader>
      <ListOptions
        selectedOption={selectedGenre}
        data={dataGenres}
        estimatedItemSize={genreItemSize}
        handleRenderItem={getMoviesByGenreId}
        scrollEnabled={!!genres}
        extraData={[selectedGenre]}
        renderSkeleton={!genres}
      />
     <View style={{flex: 1}}>
     <FlashList
        scrollEnabled={!!listOfShows}
        data={dataShows}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !listOfShows})}
        numColumns={3}
        estimatedItemSize={showItemSize}
        estimatedListSize={{width: Dimensions.get('screen').width, height: dataShows?.length * showItemSize - 4}}
        onEndReached={handleEndReached}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loadingMovieList ? <ActivityIndicator size={45} color={themes.colors.secundaryColor}/> : null}
      />
     </View>
    </S.Container>
  )
}
{/* <View>
  <S.ViewTitle>
    <S.TitlePopular>Top 20 mais populares</S.TitlePopular>
  </S.ViewTitle>
  <FlatList
    style={{paddingLeft: 20}}
    scrollEnabled={!!popularShows}
    data={!popularShows ? dataForSkeletonRender : popularShows}
    renderItem={({item}) => RenderItemPopularShows({item, handleRenderItem: teste, renderSkeleton: !popularShows})}
    showsHorizontalScrollIndicator={false}
    horizontal
    ListFooterComponent={<S.ViewListEmptyComponent/>}
  />
</View> */}