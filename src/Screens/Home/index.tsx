import { FlatList, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native"
import api from "../../Services/api"
import { useEffect, useState } from "react";
import { cdnTmdb } from "../../Global/imageCdn";
import * as S from './style'
import { HeaderHome } from "./Components/Header";
import { TypeOfShow } from "./model";
import { GlobalTextComponent } from "../../Components/GlobalTextComponent";

export const Home = () => {

  const [popularMovies, setPopularMovies] = useState()
  const [genres, setGenres] = useState()
  const listOfShows: TypeOfShow[] = [
    {id: 0, name: 'Filmes'},
    {id: 1, name: 'Séries'},
    {id: 2, name: 'Tv'},
  ]
  const [selected, setSelected] = useState<TypeOfShow>(listOfShows[0])
  const [selectedGenre, setSelectedGenre] = useState()

  async function teste() {
    console.log('entrou')
    const response = await api.get('/movie/popular?language=pt-BR&page=1&offSet=10')
    const response2 = await api.get('/genre/movie/list?language=pt')
    if (response && response2) {
      console.log(response2?.data?.genres)
      setGenres(response2?.data?.genres)
      setSelectedGenre(response2?.data?.genres[0])
      setPopularMovies(response?.data?.results)
      // console.log(response?.data?.results?.length);
    }
  }

  useEffect(() => {
    StatusBar.setTranslucent(false)
    teste()
  }, [])

  async function changeTypeOfShow(item: TypeOfShow) {
    setSelected(item)
  }

  const renderItem = ({item}: any) => {
    return (
      <S.ViewRenderItem>
        <S.MovieImage
          source={{uri: `${cdnTmdb}${item?.poster_path}`}}
          resizeMode="cover"
        />
      </S.ViewRenderItem>
    )
  }

  const [listOfMovies, setListOfMovies] = useState()

  async function getMoviesByGenreId(item: any) {
    setSelectedGenre(item)
    console.log('entoruuu')
    const response = await api.get(`discover/movie?language=pt-BR&page=1&with_genres=${item?.id}`)
    if(response) {
      console.log(response?.data)
      setListOfMovies(response?.data?.results)
    }
  }

  const renderItemGenres = ({item}: any) => {
    return (
      <TouchableOpacity
      onPress={() => {
        getMoviesByGenreId(item)
      }}
      activeOpacity={0.5}
       style={{
        marginRight: 12,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderBottomWidth: selectedGenre?.id === item?.id ? 4 : 0,
        borderBottomColor: '#3A3F47'
      }}>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={14}
          text={item?.name}
        />
      </TouchableOpacity>
    )
  }

  const renderItemMovieList = ({item}: any) => {
    return (
      <View style={{
        flex: 1,
        borderRadius: 8,
        paddingRight: 14,
        paddingBottom: 18
      }}>
        <Image
         style={{
          height: 170,
          width: '100%',
          borderRadius: 8
         }}
         resizeMode="contain"
         source={{uri: `${cdnTmdb}${item?.poster_path}`}}
        />
      </View>
    )
  }

  return (
    <S.Container>
      <HeaderHome
        handleRenderItem={changeTypeOfShow}
        listOfShows={listOfShows}
        selectedShow={selected}
      />
      <View>
        <S.ViewTitle>
          <S.TitlePopular>Top 20 mais populares</S.TitlePopular>
        </S.ViewTitle>
        <FlatList
          data={popularMovies}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={<View style={{width: 20}}/>}
        />
      </View>
      <View>
        <FlatList
         style={{paddingLeft: 20, marginTop: 40}}
          data={genres}
          renderItem={renderItemGenres}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={<View style={{width: 20}}/>}
        />   
      </View>
      <View style={{flex: 1}}> 
        <FlatList
          style={{paddingLeft: 20, marginTop: 10}}
          data={listOfMovies}
          renderItem={renderItemMovieList}
          columnWrapperStyle={{
            width: '100%'
          }}
          numColumns={3}
        />   
      </View>
    </S.Container>
  )
}
