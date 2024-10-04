import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import api from "../../Services/api";
import { useCallback, useState } from "react";
import { addFavorite, removeFavorite } from "../../Store/favorites";
import dayjs from "dayjs";

export const useMediaHubDetailsController = () => {

  const route = useRoute()
  const mediaHubId = route?.params?.item?.id
  const typeOfShow = route?.params?.selectedTypeOfShow
  const {goBack}  = useNavigation()
  const dispatch = useDispatch()
  const {favorites} = useSelector((store: RootState) => store.favorites)
  const showFavorited = !!(favorites?.find(favorite => favorite.id === mediaHubId))
  const [mediaHub, setMediaHub] = useState()
  const [watchProviders, setWatchProviders] = useState([])
  const [cast, setCast] = useState([])
  const [videos, setVideos] = useState([])
  const formatGenres = mediaHub?.genres?.slice(0, 2)?.map(genre => genre?.name)?.join('/')

  const keysWatchProviders = [...Object.keys(watchProviders)]?.filter(key => key != 'link')

  async function getMediaHubDetail() {
    const queryGenres = `/${typeOfShow}/${mediaHubId}?language=pt-BR`
    const response = await api.get(queryGenres, {
      params: {
        api_key: '00ffa5a0a1e1185fb85db6a05cfd38b8'
      }
    })
    if (response?.data) {
      setMediaHub(response?.data)
    }
  }

  async function getWatchProviders() {
    const queryGenres = `/${typeOfShow}/${mediaHubId}/watch/providers?language=pt-BR`
    const response = await api.get(queryGenres, {
      params: {
        api_key: '00ffa5a0a1e1185fb85db6a05cfd38b8'
      }
    })
    const watchProvidersBr = response?.data?.results['BR']
    if (watchProvidersBr) {
      setWatchProviders(watchProvidersBr)
    }
  }

  async function getCast() {
    const queryGenres = `/${typeOfShow}/${mediaHubId}/credits`
    const response = await api.get(queryGenres, {
      params: {
        api_key: '00ffa5a0a1e1185fb85db6a05cfd38b8'
      }
    })
    if (response?.data?.cast) {
      setCast(response?.data?.cast)
    }
  }

  async function getVideos() {
    const queryGenres = `/${typeOfShow}/${mediaHubId}/videos`
    const response = await api.get(queryGenres, {
      params: {
        api_key: '00ffa5a0a1e1185fb85db6a05cfd38b8'
      }
    })
    if (response?.data?.results) {
      setVideos(response?.data?.results)
    }
  }

  function formatRuntime() {
    const hours = Math.floor(mediaHub?.runtime / 60);  
    const minutes = mediaHub?.runtime % 60;         
    return mediaHub?.runtime ? ` ‧ ${hours}h ${minutes}m` : ` ‧ ${mediaHub?.number_of_seasons} temporadas`;
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
      getCast()
      // getVideos()
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
    watchProviders
  }
}
