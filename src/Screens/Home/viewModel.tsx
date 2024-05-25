import api from "../../Services/api"
import { useEffect, useState } from "react";
import { GenreProps, ShowProps, TypeOfShow } from "./model";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

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
  {id: 9},
  {id: 10},
  {id: 11},
  {id: 12},
  {id: 13},
  {id: 14},
  {id: 15},
  {id: 16},
  {id: 17},
  {id: 18},
  {id: 19},
  {id: 20},
]

const listOfTypeShows: TypeOfShow[] = [
  {id: 0, name: 'Filmes'},
  {id: 1, name: 'Séries'},
]

export const useHomeViewModel = () => {
  const [popularShows, setPopularShows] = useState<ShowProps[] | null>(null)
  const [genres, setGenres] = useState<GenreProps[] | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<GenreProps | null>(null)
  const [listOfShows, setListOfShows] = useState<ShowProps[] | null>(null)
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfTypeShows[0])
  const [loadingMovieList, setLoadingMovieList] = useState(false)
  const [pageMovieList, setPageMovieList] = useState(1)
  const dataShows = !listOfShows ? dataForSkeletonRender : listOfShows
  const dataGenres = !genres ? dataForSkeletonRender : genres
  const {navigate} = useNavigation()
  const showItemSize = 140
  const genreItemSize = 193
  
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

  async function getMoviesByGenreId(item: any, typeOfShow?: 'MOVIE' | 'TV_SERIES', page?: number) {
    const verifyTypeOfShow = typeOfShow ? typeOfShow : selectedTypeOfShow?.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES'
    const verifyPage = page ? page : pageMovieList
    if(!page) {
      setListOfShows(null)
      setSelectedGenre(item)
    }
    const query = `/discover/${verifyTypeOfShow === 'MOVIE' ? 'movie' : 'tv'}?language=pt-BR&page=${verifyPage}&with_genres=${item?.id}`
    const responseDiscoverShows = await api.get(query)
    if(responseDiscoverShows) {
      if(!page) {
        console.log(responseDiscoverShows?.data?.results?.length);
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

  function handleNavigateShowDetails(item: ShowProps) {
    navigate('ShowsDetails', item)
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

  return {
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
  }
}
