import { useDispatch, useSelector } from "react-redux"
import { setIsGuest, setUser } from "../../Store/user"
import { RootState } from "../../Store/store"
import { useNavigation } from "@react-navigation/native"
import { Modalize } from "react-native-modalize"
import { useRef, useState } from "react"
import { deleteUserRequest } from "../../Services/api"
import { globalMessage } from "../Functions/useGlobalMessage"

export const useControllerUser = () => {

  const {navigate} = useNavigation()
  const {isGuest, user} = useSelector((store: RootState) => store.user)
  const deleteUserRef = useRef<Modalize>(null);
  const logoutUserRef = useRef<Modalize>(null);
  const [loadingButton, setLoadingButton] = useState(false)
  const dispatch = useDispatch()

  function showMesageUserGuest() {
    globalMessage({type: 'danger', message: 'Faça login para continuar!'})
  }

  function openModalDeleteUser() {
    if(isGuest) {
      showMesageUserGuest()
      return
    }
    deleteUserRef.current?.open();
  }

  function openModalLogoutUser() {
    if(isGuest) {
      showMesageUserGuest()
      return
    }
    logoutUserRef.current?.open();
  }

  function navigateEditUser() {
    if(isGuest) {
      showMesageUserGuest()
      return
    }
    navigate('EditUserAccount')
  }

  function navigateFavorites() {
    if(isGuest) {
      showMesageUserGuest()
      return
    }
    navigate('Favorites')
  }

  function handleLogout() {
    dispatch(setUser(null))
    dispatch(setIsGuest(false))
  }


  async function deleteAccount() {
    try {
      setLoadingButton(true)
      const token = user?.token
      if(!token) {
        handleLogout()
        throw new Error('Usuário não autorizado, por favor faça login novamente')
      }
      const response = await deleteUserRequest(token)
      if(response) {
        globalMessage({type: 'success', message: `Usuário ${response?.name} excluído com sucesso!`})
        handleLogout()
      }
    } catch (error: any) {
      const catchError = error?.message
      globalMessage({type: 'danger', message: catchError})
    } finally {
      setLoadingButton(false)
    }
  }

  const userOptions = [
    {id: 1, name: 'Editar dados', icon: 'edit', handleRenderItem: navigateEditUser},
    {id: 2, name: 'Favoritos', icon: 'heart', handleRenderItem: navigateFavorites},
    {id: 3, name: 'Excluir conta', icon: 'trash-2', handleRenderItem: openModalDeleteUser}, 
    {id: 4, name: 'Sair', icon: 'log-out', handleRenderItem: openModalLogoutUser},
  ]

  return {
    isGuest,
    user,
    handleLogout,
    userOptions,
    deleteUserRef,
    logoutUserRef,
    deleteAccount,
    loadingButton
  }
}