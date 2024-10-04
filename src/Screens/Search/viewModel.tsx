import { Keyboard, TextInput } from "react-native"
import { useCallback, useRef, useState } from "react"
import { useDebounce } from "../../Hooks/useDebounce"
import { ShowProps, TypeOfShow } from "../Home/model"
import { getTrendingMediaRequest, searchMediaHub } from "../../Services/api"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

export const useSearchController = () => {
    
  const listOfTypeShows: TypeOfShow[] = [
    {id: 0, name: 'Filmes'},
    {id: 1, name: 'Séries'},
  ]
  const [value, setValue] = useState('')
  const inputRef = useRef<TextInput>()
  const debounce = useDebounce()
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])
  const {navigate} = useNavigation()
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfTypeShows[0])
  const [trendingMedia, setTrendingMedia] = useState([])
  const dataList = value?.length === 0 ? trendingMedia : selectedTypeOfShow?.name === 'Filmes' ? movies : series

  function handleIcon() {
    setValue("")
    Keyboard.dismiss()
    setMovies([])
    setSeries([])
  }

  async function searchMedia(term: string) {
    const resultSearch = await searchMediaHub(term)
    setMovies(resultSearch?.movies)
    setSeries(resultSearch?.series)
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
    listOfTypeShows
  }
}