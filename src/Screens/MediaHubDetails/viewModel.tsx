import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import api, { getCastRequest, getMediaHubDetailsRequest, getSimilar, getVideos, getWatchProvidersRequest } from "../../Services/api";
import { useCallback, useState } from "react";
import { addFavorite, removeFavorite } from "../../Store/favorites";
import dayjs from "dayjs";
import { ShowProps } from "../Home/types";

export const useMediaHubDetailsController = () => {

  const route = useRoute()
  const mediaHubId = route?.params?.item?.id
  const typeOfShow = route?.params?.selectedTypeOfShow
  const {goBack, navigate}  = useNavigation()
  const dispatch = useDispatch()
  const {favorites} = useSelector((store: RootState) => store.favorites)
  const showFavorited = !!(favorites?.find(favorite => favorite.id === mediaHubId))
  const [mediaHub, setMediaHub] = useState()
  const [watchProviders, setWatchProviders] = useState([])
  const [cast, setCast] = useState([])
  const [videos, setVideos] = useState([])
  const formatGenres = mediaHub?.genres?.slice(0, 2)?.map(genre => genre?.name)?.join('/')
  const notRelease = Number(dayjs(mediaHub?.release_date || mediaHub?.first_air_date)) > Number(dayjs())
  const [loading, setLoading] = useState(true)
  const [similar, setSimilar] = useState([])
  const keysWatchProviders = [...Object.keys(watchProviders)]?.filter(key => key != 'link')

  function handleNavigateShowDetails(item: ShowProps) {
    goBack()
    navigate('MediaHubDetails', {item, selectedTypeOfShow: typeOfShow})
  }

  async function getMediaHubDetail() {
    const response = await getMediaHubDetailsRequest(typeOfShow, mediaHubId)
    if (response) {
      setMediaHub(response)
    }
  }


  async function getMediaHubVideos() {
    const response = await getVideos(typeOfShow, mediaHubId)
    if (response) {
      setVideos(response?.results)
    }
  }

  async function getSimilarMediaHub() {
    const response = await getSimilar(typeOfShow, mediaHubId)
    if (response?.results) {
      setSimilar(response?.results)
    }
  }

  async function getWatchProviders() {
    const response = await getWatchProvidersRequest(typeOfShow, mediaHubId)
    const watchProvidersBr = response?.results['BR']
    if (watchProvidersBr) {
      setWatchProviders(watchProvidersBr)
    }
  }

  async function getCast() {
    const response = await getCastRequest(typeOfShow, mediaHubId)
    if (response?.cast) {
      setCast(response?.cast)
      setLoading(false)
    }
  }

  function formatRuntime() {
    const hours = Math.floor(mediaHub?.runtime / 60);  
    const minutes = mediaHub?.runtime % 60;         
    return notRelease && !mediaHub?.runtime && !mediaHub?.number_of_seasons ? '' : mediaHub?.runtime ? ` ‧ ${hours > 0 ? hours + 'h ' : ''}${minutes}m` : ` ‧ ${mediaHub?.number_of_seasons} ${mediaHub?.number_of_seasons > 1 ? 'temporadas' : 'temporada'}`;
  }

  function formatYear() {
    return dayjs(mediaHub?.release_date || mediaHub?.first_air_date).format('YYYY');
  }
  
  function favoriteShow() {
    if(showFavorited) {
      dispatch(removeFavorite(mediaHub))
    } else {
      dispatch(addFavorite(mediaHub))
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMediaHubDetail()
      getWatchProviders()
      // getSimilarMediaHub()
      getMediaHubVideos()
      getCast()
    }, [])
  )

  return {
    goBack,
    formatRuntime,
    formatGenres,
    formatYear,
    mediaHub,
    showFavorited,
    favoriteShow,
    keysWatchProviders,
    cast,
    watchProviders,
    notRelease,
    loading,
    similar,
    handleNavigateShowDetails,
    videos
  }
}
