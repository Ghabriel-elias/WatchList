import { ActivityIndicator, FlatList} from "react-native"
import api from "../../Services/api"
import { useEffect, useState } from "react";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { GenreProps, ShowProps, TypeOfShow } from "./model";
import { RenderItemGenres } from "./Components/RenderItemGenres";
import { RenderItemListShows } from "./Components/RenderItemListShows";
import themes from "../../Global/themes";

const dataForSkeletonRender = [
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
]

const listOfTypeShows: TypeOfShow[] = [
  {id: 0, name: 'Filmes'},
  {id: 1, name: 'Séries'},
]

export const Home = () => {
  const [popularShows, setPopularShows] = useState<ShowProps[] | null>(null)
  const [genres, setGenres] = useState<GenreProps[] | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<GenreProps | null>(null)
  const [listOfShows, setListOfShows] = useState<ShowProps[] | null>(null)
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfTypeShows[0])
  const [loadingMovieList, setLoadingMovieList] = useState(false)
  const [pageMovieList, setPageMovieList] = useState(1)

  async function requestShowByType(typeOfShow: 'MOVIE' | 'TV_SERIES') {
    // const queryPopularShows = `/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/popular?language=pt-BR&page=1`
    const queryGenres = `/genre/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/list?language=pt-BR`
    const responseGenres = await api.get(queryGenres)
    // const responsePopularShows = await api.get(queryPopularShows)
    // if (responsePopularShows && responseGenres) {
    if (responseGenres) {
      setGenres(responseGenres?.data?.genres)
      // setPopularShows(responsePopularShows?.data?.results)
      setSelectedGenre(responseGenres?.data?.genres[0])
      await getMoviesByGenreId(responseGenres?.data?.genres[0], typeOfShow)
    }
  }

  function clearStates() {
    setListOfShows(null)
    setPageMovieList(1)
    setLoadingMovieList(false)
    // setPopularShows(null)
    setGenres(null)
  }

  async function changeTypeOfShow(item: TypeOfShow) {
    clearStates()
    setSelectedTypeOfShow(item)
    await requestShowByType(item.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
  }

  async function getMoviesByGenreId(item: any, typeOfShow: 'MOVIE' | 'TV_SERIES', page?: number) {
    const verifyPage = page ? page : pageMovieList
    if(!page) {
      setListOfShows(null)
      setSelectedGenre(item)
    }
    const query = `/discover/${typeOfShow === 'MOVIE' ? 'movie' : 'tv'}?language=pt-BR&page=${verifyPage}&with_genres=${item?.id}`
    const responseDiscoverShows = await api.get(query)
    if(responseDiscoverShows) {
      if(!page) {
        setListOfShows(responseDiscoverShows?.data?.results)
      } else {
        setListOfShows([
          ...listOfShows,
          ...responseDiscoverShows?.data?.results
        ])
        setLoadingMovieList(false)
      }
    }
  }

  function teste() {
    console.log('yo');
  }

  const handleEndReached = async () => {
    if(loadingMovieList || !listOfShows) return
    setLoadingMovieList(true)
    setPageMovieList(prev => prev + 1)
    const page = pageMovieList + 1
    const typeShowVerify = selectedTypeOfShow.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES'
    await getMoviesByGenreId(selectedGenre, typeShowVerify, page)
  };

  useEffect(() => {
    requestShowByType('MOVIE')
  }, [])

  return (
    <S.Container>
      <S.ViewHeader>
        <HeaderHome
          handleRenderItem={changeTypeOfShow}
          listOfShows={listOfTypeShows}
          selectedShow={selectedTypeOfShow}
        />
      </S.ViewHeader>
      <S.ViewListGenres>
        <FlatList
          style={{paddingLeft: 20}}
          scrollEnabled={!!genres}
          data={!genres ? dataForSkeletonRender : genres}
          renderItem={({item}) => RenderItemGenres({item, getMoviesByGenreId, renderSkeleton: !genres, selectedGenre, selectedTypeOfShow})}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={<S.ViewListEmptyComponent/>}
        />   
      </S.ViewListGenres>
      <FlatList
        scrollEnabled={!!listOfShows}
        style={{marginTop: 10}}
        data={!listOfShows ? dataForSkeletonRender : listOfShows}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: teste, renderSkeleton: !listOfShows})}
        numColumns={3}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loadingMovieList ? <ActivityIndicator size={45} color={themes.colors.secundaryColor}/> : null}
        columnWrapperStyle={{
          gap: 10,
          paddingHorizontal: 20,
        }}
      />
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