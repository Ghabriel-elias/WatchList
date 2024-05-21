import { Animated, FlatList, View } from "react-native"
import api from "../../Services/api"
import { useEffect, useRef, useState } from "react";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { TypeOfShow } from "./model";
import { RenderItemPopularShows } from "./Components/RenderItemPopularShows";
import { RenderItemGenres } from "./Components/RenderItemGenres";
import { RenderItemListShows } from "./Components/RenderItemListShows";

export const Home = () => {

  const [popularShows, setPopularShows] = useState()
  const [genres, setGenres] = useState()
  const listOfShows: TypeOfShow[] = [
    {id: 0, name: 'Filmes'},
    {id: 1, name: 'Séries'},
  ]
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfShows[0])
  const [selectedGenre, setSelectedGenre] = useState()
  const [listOfMovies, setListOfMovies] = useState()
  const [showPopularList, setShowPopularList] = useState(true)

  async function requestShowByType(typeOfShow: 'MOVIE' | 'TV_SERIES') {
    const queryPopularShows = `/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/popular?language=pt-BR&page=1`
    const queryGenres = `/genre/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/list?language=pt-BR`
    const response = await api.get(queryPopularShows)
    const response2 = await api.get(queryGenres)
    if (response && response2) {
      setGenres(response2?.data?.genres)
      setPopularShows(response?.data?.results)
      setSelectedGenre(response2?.data?.genres[0])
      await getMoviesByGenreId(response2?.data?.genres[0], typeOfShow)
    }
  }

  async function changeTypeOfShow(item: TypeOfShow) {
    setSelectedTypeOfShow(item)
    await requestShowByType(item.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES')
  }

  async function getMoviesByGenreId(item: any, typeOfShow: 'MOVIE' | 'TV_SERIES') {
    setSelectedGenre(item)
    const query = `/discover/${typeOfShow === 'MOVIE' ? 'movie' : 'tv'}?language=pt-BR&page=1&with_genres=${item?.id}`
    const response = await api.get(query)
    if(response) {
      setListOfMovies(response?.data?.results)
    }
  }

  const renderItemGenres = RenderItemGenres({
    getMoviesByGenreId,
    selectedGenre,
    selectedTypeOfShow
  })

  const renderItemListShows = RenderItemListShows(() => {
    console.log('teste de fn');
  })

  const renderItemPopularShows = RenderItemPopularShows(() => {
    console.log('teste de fn');
  })

  const animation = useRef(new Animated.Value(1)).current; // 1 significa visível

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (yOffset > 0) {
      Animated.timing(animation, {
        toValue: 0, // Oculto
        duration: 300, // Duração da animação em milissegundos
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1, // Visível
        duration: 300, // Duração da animação em milissegundos
        useNativeDriver: false,
      }).start();
    }
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 275], // Altura da vista, ajuste conforme necessário
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });


  useEffect(() => {
    requestShowByType('MOVIE')
  }, [])

  return (
    <S.Container>
      <HeaderHome
        handleRenderItem={changeTypeOfShow}
        listOfShows={listOfShows}
        selectedShow={selectedTypeOfShow}
      />
      <Animated.View
        style={{
          height: heightInterpolate,
          opacity: opacityInterpolate,
        }}
      >
          <S.ViewTitle>
            <S.TitlePopular>Top 20 mais populares</S.TitlePopular>
          </S.ViewTitle>
          <FlatList
            style={{paddingLeft: 20}}
            data={popularShows}
            renderItem={renderItemPopularShows}
            showsHorizontalScrollIndicator={false}
            horizontal
            ListFooterComponent={<S.ViewListEmptyComponent/>}
          />
        {/* </View> */}
     </Animated.View>
      <View>
        <FlatList
          style={{paddingLeft: 20}}
          data={genres}
          renderItem={renderItemGenres}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={<S.ViewListEmptyComponent/>}
        />   
      </View>
      <View style={{flex: 1}}> 
        <FlatList
          style={{paddingHorizontal: 20, marginTop: 10}}
          data={listOfMovies}
          renderItem={renderItemListShows}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          columnWrapperStyle={{
            gap: 10
          }}
        />   
      </View>
    </S.Container>
  )
}
