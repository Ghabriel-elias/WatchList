import { ActivityIndicator, Dimensions, FlatList, View} from "react-native"
import { RenderItemListShows } from "./Components/RenderItemListShows";
import themes from "../../Global/themes";
import { FlashList } from "@shopify/flash-list";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { useHomeViewModel } from "./viewModel";
import { RenderItemGenres } from "./Components/RenderItemGenres";
import { RenderItemPopularShows } from "./Components/RenderItemPopularShows";

export const Home = () => {
  const {
    changeTypeOfShow,
    selectedTypeOfShow,
    genres,
    genreItemSize,
    dataGenres,
    listOfShowsRef,
    listOfShows,
    dataShows,
    showItemSize,
    handleEndReached,
    loadingMovieList,
    selectedGenre,
    listOfTypeShows,
    getMediaHub,
    handleNavigateShowDetails,
    listOfGenresRef,
    popularShows,
    dataForSkeletonRender,
    listOfPopularShowsRef
  } = useHomeViewModel()

  return (
    <S.Container>
    <View>
      <HeaderHome
        handleRenderItem={changeTypeOfShow}
        listOfShows={listOfTypeShows}
        selectedShow={selectedTypeOfShow}
      />
    </View>
     <S.MainContent>
      <FlashList
          scrollEnabled={!!listOfShows}
          data={dataShows}
          renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !listOfShows})}
          numColumns={3}
          ListHeaderComponent={
            <>
              <View>
                <S.ViewTitle>
                  <S.TitlePopular>Top 20 mais populares</S.TitlePopular>
                </S.ViewTitle>
                <S.BoxPopularMedia>
                  <FlashList
                    scrollEnabled={!!popularShows}
                    ref={listOfPopularShowsRef}
                    data={!popularShows ? dataForSkeletonRender : popularShows}
                    renderItem={({item}) => RenderItemPopularShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !popularShows})}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    estimatedItemSize={RFValue(140)}
                    estimatedListSize={{width: RFValue(140) * 20, height: RFValue(210)}}
                  />
                </S.BoxPopularMedia>
              </View>
              <S.ViewListOptions>
                <FlashList
                  scrollEnabled={!!genres}
                  estimatedItemSize={RFValue(genreItemSize)}
                  ref={listOfGenresRef}
                  data={dataGenres}
                  extraData={[selectedGenre, listOfGenresRef]}
                  estimatedListSize={{height: RFValue(30), width: dataGenres?.length * RFValue(genreItemSize)}}
                  renderItem={({item}) => RenderItemGenres({item, handleRenderItem: getMediaHub, renderSkeleton: !genres, selectedOption: selectedGenre})}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />   
              </S.ViewListOptions>
            </>
          }
          ref={listOfShowsRef}
          extraData={[selectedGenre, listOfGenresRef]}
          estimatedItemSize={showItemSize}
          estimatedListSize={{width: Dimensions.get('screen').width, height: dataShows?.length * showItemSize - 4}}
          onEndReached={handleEndReached}
          contentContainerStyle={{paddingHorizontal: 20}}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMovieList ? (
            <S.BoxLoadingList>
              <ActivityIndicator size={45} color={themes.colors.secundaryColor}/>
            </S.BoxLoadingList>
          ) : null}
        />
     </S.MainContent>
    </S.Container>
  )
}