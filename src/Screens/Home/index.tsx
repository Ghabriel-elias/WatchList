import { FlatList, View } from "react-native"
import api from "../../Services/api"
import { useEffect, useState } from "react";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { GenreProps, ShowProps, TypeOfShow } from "./model";
import { RenderItemPopularShows } from "./Components/RenderItemPopularShows";
import { RenderItemGenres } from "./Components/RenderItemGenres";
import { RenderItemListShows } from "./Components/RenderItemListShows";

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

  async function requestShowByType(typeOfShow: 'MOVIE' | 'TV_SERIES') {
    const queryPopularShows = `/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/popular?language=pt-BR&page=1`
    const queryGenres = `/genre/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/list?language=pt-BR`
    const responseGenres = await api.get(queryGenres)
    const responsePopularShows = await api.get(queryPopularShows)
    if (responsePopularShows && responseGenres) {
      setGenres(responseGenres?.data?.genres)
      setPopularShows(responsePopularShows?.data?.results)
      setSelectedGenre(responseGenres?.data?.genres[0])
      await getMoviesByGenreId(responseGenres?.data?.genres[0], typeOfShow)
    }
  }

  function clearStates() {
    setPopularShows(null)
    setGenres(null)
    setListOfShows(null)
  }

  async function changeTypeOfShow(item: TypeOfShow) {
    clearStates()
    setSelectedTypeOfShow(item)
    await requestShowByType(item.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
  }

  const [pageMovieList, setPageMovieList] = useState(1)

  const [loadingMovieList, setLoadingMovieList] = useState(false)
  async function getMoviesByGenreId(item: any, typeOfShow: 'MOVIE' | 'TV_SERIES', pagin?: boolean) {
    console.log('pageMovieList',pageMovieList)
    if(!pagin) {
      setListOfShows(null)
      setSelectedGenre(item)
    } 
    const query = `/discover/${typeOfShow === 'MOVIE' ? 'movie' : 'tv'}?language=pt-BR&page=${pageMovieList}&with_genres=${item?.id}`
    const responseDiscoverShows = await api.get(query)
    if(responseDiscoverShows) {
      if(!pagin) {
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

  useEffect(() => {
    requestShowByType('MOVIE')
  }, [])

  return (
    <S.Container showsHorizontalScrollIndicator stickyHeaderIndices={[2]}>
    <S.ViewHeader>
      <HeaderHome
        handleRenderItem={changeTypeOfShow}
        listOfShows={listOfTypeShows}
        selectedShow={selectedTypeOfShow}
      />
    </S.ViewHeader>
    <View>
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
    </View>
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
        style={{ paddingHorizontal: 20, marginTop: 10}}
        data={dataForSkeletonRender}
        renderItem={RenderItemListShows}
        scrollEnabled={!!listOfShows}
        data={!listOfShows ? dataForSkeletonRender : listOfShows}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: teste, renderSkeleton: !popularShows})}
        numColumns={3}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('ouxe')
          // if(loadingMovieList) return
          // setLoadingMovieList(true)
          // setPageMovieList(prev => prev + 1)
          // await getMoviesByGenreId(selectedGenre,selectedTypeOfShow.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
        }}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          gap: 10,
        }}
      />
    </S.Container>
  )
}
