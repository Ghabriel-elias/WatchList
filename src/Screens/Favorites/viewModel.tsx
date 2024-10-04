import { BackHandler } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useCallback } from "react";

export const useFavoritesController = () => {

  const {goBack, navigate} = useNavigation()
  const {favorites} = useSelector((store: RootState) => store.favorites)

  useFocusEffect(
    useCallback(() => {
      const backHandlerListener = BackHandler.addEventListener(`hardwareBackPress`, () => {
        navigate('Home')
        return true
      })
      return () => {
        backHandlerListener.remove()
      }
    }, [])
  )

  function formatInfo(item: any) {
    const formatGenres = item?.genres?.slice(0, 2)?.map(genre => genre?.name)?.join('/')
    const hours = Math.floor(item?.runtime / 60);  
    const minutes = item?.runtime % 60;         
    const formatRunTime = item?.runtime ? ` ‧ ${hours}h ${minutes}m` : ` ‧ ${item?.number_of_seasons} temporadas`;
    return `${formatGenres}${formatRunTime}`
  }
  
  return {
    formatInfo,
    favorites,
    goBack,
    navigate
  }
}