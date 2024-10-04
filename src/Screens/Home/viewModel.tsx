import { getGenres, getMediaHubByGenreId, getPopularShows } from "../../Services/api"
import { useEffect, useRef, useState } from "react";
import { GenreProps, ShowProps, TypeOfShow } from "./model";
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
  const listOfShowsRef = useRef<any>(null);
  const listOfGenresRef = useRef<any>(null);
  const listOfPopularShowsRef = useRef<any>(null);
  
  async function requestShowByType(typeOfShow: 'movie' | 'tv') {
    const responseGenres = await getGenres(typeOfShow)
    const responsePopularShows = await getPopularShows(typeOfShow)
    if (responsePopularShows && responseGenres) {
      if (responseGenres) {
        setGenres(responseGenres?.genres)
        setPopularShows(responsePopularShows?.results)
        setSelectedGenre(responseGenres?.genres[0])
        await getMediaHub(responseGenres?.genres[0], typeOfShow)
      }
    }
  }

  function clearStates() {
    setListOfShows(null)
    setPageMovieList(1)
    setLoadingMovieList(false)
    setPopularShows(null)
    setGenres(null)
  }

  async function changeTypeOfShow(item: TypeOfShow) {
    listOfShowsRef.current?.scrollToOffset({animated: true, offset: 0})
    listOfGenresRef.current?.scrollToOffset({animated: true, offset: 0})
    listOfPopularShowsRef.current?.scrollToOffset({animated: true, offset: 0})
    clearStates()
    setSelectedTypeOfShow(item)
    await requestShowByType(item.name === 'Filmes' ? 'movie' : 'tv')
  }

  async function getMediaHub(item: any, typeOfShow?: 'movie' | 'tv', page?: number) {
    const verifyTypeOfShow = typeOfShow ? typeOfShow : selectedTypeOfShow?.name === 'Filmes' ? 'movie' : 'tv'
    const verifyPage = page ? page : pageMovieList
    if(!page) {
      listOfShowsRef.current?.scrollToOffset({animated: true, offset: 0})
      setListOfShows(null)
      setSelectedGenre(item)
    }
    const responseMediaHub = await getMediaHubByGenreId(verifyTypeOfShow, verifyPage, item?.id)
    if(responseMediaHub) {
      if(!page) {
        const getGenreId = genres?.findIndex((genre) => genre?.id === item?.id)
        setListOfShows(responseMediaHub?.results)
        if(getGenreId && getGenreId != -1) {
          listOfGenresRef.current?.scrollToIndex({
            index: getGenreId - 1,
            viewOffset: 0,
            viewPosition: 0,
            animated: true
          })
        }
      } else {
        setListOfShows([
          ...listOfShows,
          ...responseMediaHub?.results
        ])
        setLoadingMovieList(false)
      }
    }
  }

  function handleNavigateShowDetails(item: ShowProps) {
    navigate('MediaHubDetails', {item, selectedTypeOfShow: selectedTypeOfShow?.name === 'Filmes' ? 'movie' : 'tv'})
  }

  const handleEndReached = async () => {
    if(loadingMovieList || !listOfShows) return
    setLoadingMovieList(true) 
    setPageMovieList(prev => prev + 1)
    const page = pageMovieList + 1
    const typeShowVerify = selectedTypeOfShow.name === 'Filmes' ? 'movie' : 'tv'
    await getMediaHub(selectedGenre, typeShowVerify, page)
  };

  useEffect(() => {
    requestShowByType('movie')
  }, [])

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
    getMediaHub,
    handleNavigateShowDetails,
    popularShows,
    dataForSkeletonRender,
    listOfPopularShowsRef
  }
}
