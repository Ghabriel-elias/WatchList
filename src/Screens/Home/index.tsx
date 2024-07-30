import { ActivityIndicator, Dimensions, View} from "react-native"
import { RenderItemListShows } from "./Components/RenderItemListShows";
import themes from "../../Global/themes";
import { FlashList } from "@shopify/flash-list";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { useHomeController } from "./model";
import { RenderItemGenres } from "./Components/RenderItemGenres";

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
    getMoviesByGenreId,
    handleNavigateShowDetails,
    listOfGenresRef,
    getShows
  } = useHomeController()

  return (
    <S.Container>
    <View>
    <LinearGradient 
        colors={['rgba(22, 24, 24, 0.8)', 'rgb(38, 42, 48)']}
        start={{ x: 0, y: 2 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: 'absolute',
          top: 0,
        }}
      >
        <S.ViewHeader>
          <HeaderHome
            handleRenderItem={changeTypeOfShow}
            listOfShows={listOfTypeShows}
            selectedShow={selectedTypeOfShow}
          />
        </S.ViewHeader>
        <S.ViewListOptions>
          <FlashList
            scrollEnabled={!!genres}
            estimatedItemSize={RFValue(genreItemSize)}
            extraData={[selectedGenre, listOfGenresRef]}
            ref={listOfGenresRef}
            data={dataGenres}
            estimatedListSize={{height: RFValue(30), width: dataGenres?.length * RFValue(genreItemSize)}}
            renderItem={({item}) => RenderItemGenres({item, handleRenderItem: getShows, renderSkeleton: !genres, selectedOption: selectedGenre})}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: 25}}
            horizontal
            ListFooterComponent={<S.ViewListEmptyComponent/>}
          />   
        </S.ViewListOptions>
      </LinearGradient>
    </View>
     <View style={{flex: 1, zIndex: -10}}>
     <FlashList
        scrollEnabled={!!listOfShows}
        data={dataShows}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !listOfShows})}
        numColumns={3}
        ref={listOfShowsRef}
        extraData={[listOfShowsRef]}
        estimatedItemSize={showItemSize}
        estimatedListSize={{width: Dimensions.get('screen').width, height: dataShows?.length * showItemSize - 4}}
        onEndReached={handleEndReached}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: RFValue(135)}}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loadingMovieList ? (
          <View style={{height: 80, justifyContent:'center', alignItems: 'center',width: '100%'}}>
            <ActivityIndicator size={45} color={themes.colors.secundaryColor}/>
          </View>
        ) : null}
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