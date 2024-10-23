import { Keyboard, TextInput } from "react-native"
import { useCallback, useRef, useState } from "react"
import { useDebounce } from "../../Hooks/useDebounce"
import { ShowProps, TypeOfShow } from "../Home/model"
import { getTrendingMediaRequest, searchMediaHub } from "../../Services/api"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { CastMember } from "../MediaHubDetails/model"

export const useSearchController = () => {
    

  const [value, setValue] = useState('')
  const inputRef = useRef<TextInput>()
  const debounce = useDebounce()
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])
  const [persons, setPersons] = useState([])
  const listOfTypeShows: TypeOfShow[] = [
    {id: 0, name: 'Filmes', data: movies},
    {id: 1, name: 'Séries', data: series},
    {id: 3, name: 'Pessoas', data: series},
  ]
  const {navigate} = useNavigation()
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfTypeShows[0])
  const [trendingMedia, setTrendingMedia] = useState([])
  const dataList = value?.length === 0 ? trendingMedia : selectedTypeOfShow?.name === 'Filmes' ? movies : series
  const refListTypeShow = useRef<FlatList>()

  function handleIcon() {
    setValue("")
    Keyboard.dismiss()
    setMovies([])
    setSeries([])
    setSelectedTypeOfShow(listOfTypeShows[0])
  }

  async function searchMedia(term: string) {
    const resultSearch = await searchMediaHub(term)
    setMovies(resultSearch?.movies)
    setSeries(resultSearch?.series)
    setPersons(resultSearch?.persons)
  }

  function handleCast(item: CastMember) {
    navigate('PersonDetails', {id: item?.id})
  }

  function handleTypeShow(item: TypeOfShow, index: number) {
    setSelectedTypeOfShow(item)
    refListTypeShow.current?.scrollToIndex({
      index: index,
      viewOffset: 0,
      viewPosition: 0,
      animated: true
    })
  }
  
  async function getTrendingMedia() {
    const resultSearch = await getTrendingMediaRequest()
    setTrendingMedia(resultSearch?.results)
  }

  function handleNavigateShowDetails(item: ShowProps) {
    navigate('MediaHubDetails', {item, selectedTypeOfShow: selectedTypeOfShow?.name === 'Filmes' ? 'movie' : 'tv'})
  }

  useFocusEffect(
    useCallback(() => {
      getTrendingMedia()
    }, [])
  )

  return {
    selectedTypeOfShow,
    setSelectedTypeOfShow,
    value,
    setValue,
    debounce,
    searchMedia,
    inputRef,
    handleIcon,
    dataList,
    handleNavigateShowDetails,
    listOfTypeShows,
    persons,
    navigate,
    handleTypeShow,
    handleCast,
    refListTypeShow
  }
}