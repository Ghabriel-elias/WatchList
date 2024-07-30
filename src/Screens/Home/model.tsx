import api, { getGenresRequest, getShowsByGenreRequest } from "../../Services/api"
import { useCallback, useEffect, useRef, useState } from "react";
import { GenreProps, ShowProps, TypeOfShow } from "./types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { globalMessage } from "../Functions/useGlobalMessage";

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
  {id: 0, name: 'Filmes', label: 'movies'},
  {id: 1, name: 'Séries', label: 'series'},
]

export const useHomeController = () => {
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
  const listOfShowsRef = useRef<any>(null);
  const listOfGenresRef = useRef<any>(null);
  
  async function requestShowByType(typeOfShow: 'MOVIE' | 'TV_SERIES') {
    const queryGenres = `/genre/${typeOfShow === 'MOVIE' ? 'movie': 'tv'}/list?language=pt-BR`
    const responseGenres = await api.get(queryGenres)
    if (responseGenres) {
      setGenres(responseGenres?.data?.genres)
      setSelectedGenre(responseGenres?.data?.genres[0])
      await getMoviesByGenreId(responseGenres?.data?.genres[0], typeOfShow)
    }
  }

  function clearStates() {
    setListOfShows(null)
    setPageMovieList(1)
    setLoadingMovieList(false)
    setGenres(null)
  }

  async function changeTypeOfShow(item: TypeOfShow) {
    listOfShowsRef.current?.scrollToOffset({animated: true, offset: 0})
    listOfGenresRef.current?.scrollToOffset({animated: true, offset: 0})
    clearStates()
    setSelectedTypeOfShow(item)
    getGenres()
  }

  async function getMoviesByGenreId(item: any, typeOfShow?: 'MOVIE' | 'TV_SERIES', page?: number) {
    const verifyTypeOfShow = typeOfShow ? typeOfShow : selectedTypeOfShow?.name === 'Filmes' ? 'MOVIE' : 'TV_SERIES'
    const verifyPage = page ? page : pageMovieList
    if(!page) {
      listOfShowsRef.current?.scrollToOffset({animated: true, offset: 0})
      setListOfShows(null)
      setSelectedGenre(item)
    }
    const query = `/${verifyTypeOfShow === 'MOVIE' ? 'movies' : 'series'}/${item?.genre}`
    console.log(query)
    const responseDiscoverShows = await api.get(query)
    console.log(responseDiscoverShows)
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

  async function getShows(genreData: GenreProps, typeOfShow?: 'movies' | 'series') {
    try {
      setSelectedGenre(genreData)
      const verifyTypeOfShow = typeOfShow || selectedTypeOfShow.label
      const shows = await getShowsByGenreRequest(verifyTypeOfShow, genreData.genre)
      if(shows) {
        setListOfShows(shows)
      }
    } catch (error: any) {
      const catchError = error.message
      globalMessage({type: 'danger', message: catchError})
    } finally {
      setLoadingMovieList(false)
    }
  }

  async function getGenres() {
    try {
      const genres = await getGenresRequest()
      if(genres) {
        setGenres(genres)
        setSelectedGenre(genres[0])
        getShows(genres[0], 'movies')
      }
    } catch (error: any) {
      const catchError = error.message
      globalMessage({type: 'danger', message: catchError})
    }
  }

  useFocusEffect(
    useCallback(() => {
      getGenres()
    }, [])
  )

  return {
    changeTypeOfShow,
    selectedTypeOfShow,
    genres,
    listOfShowsRef,
    listOfGenresRef,
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
    handleNavigateShowDetails,
    getShows
  }
}
