import { FlatList, Image, ImageBackground, Text, View } from "react-native"
import api from "../../Services/api"
import { useEffect, useState } from "react";
import themes from "../../Global/themes";
import { cdnTmdb } from "../../Global/imageCdn";
import * as S from './style'

export const Home = () => {

  const [popularMovies, setPopularMovies] = useState()

  async function teste() {
    const response = await api.get('/movie/popular?language=pt-BR&page=1')
    if (response) {
      setPopularMovies(response?.data?.results)
      console.log(response?.data?.results?.length);
    }
  }

  useEffect(() => {
    teste()
  }, [])

  const renderItem = ({item, index}: any) => {
    return (
      <S.ViewRenderItem>
        <S.MovieImage
          source={{uri: `${cdnTmdb}${item?.poster_path}`}}
          resizeMode="cover"
        />
      </S.ViewRenderItem>
    )
  }

  return (
    <S.Container>
      <View>
        <S.ViewTitle>
          <S.TitlePopular>Mais populares</S.TitlePopular>
        </S.ViewTitle>
        <FlatList
          data={popularMovies}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </S.Container>
  )
}
