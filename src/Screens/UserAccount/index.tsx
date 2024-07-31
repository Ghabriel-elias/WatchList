import { Dimensions, View } from "react-native"
import * as S from './style'
import { HeaderUserGuest } from "./Components/HeaderUserGuest"
import { useDispatch, useSelector } from "react-redux"
import { setIsGuest, setUser } from "../../Store/user"
import { RootState } from "../../Store/store"
import { HeaderUser } from "./Components/HeaderUser"
import { FlashList } from "@shopify/flash-list"
import { FooterCopyright } from "./Components/Footer"
import { RenderItem } from "./Components/RenderItem"
import { RFValue } from "react-native-responsive-fontsize"
import { useNavigation } from "@react-navigation/native"
import { Modalize } from "react-native-modalize"
import { useRef, useState } from "react"
import { ModelDeleteAccount } from "./Components/ModelDeleteAccount"
import { ModelLogout } from "./Components/ModelLogout"
import { deleteUserRequest } from "../../Services/api"
import { globalMessage } from "../Functions/useGlobalMessage"

export const UserAccount = () => {

  const {navigate} = useNavigation()
  const {isGuest, user} = useSelector((store: RootState) => store.user)

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

  const userOptions = [
    {id: 1, name: 'Editar dados', icon: 'edit', handleRenderItem: navigateEditUser},
    {id: 2, name: 'Favoritos', icon: 'heart', handleRenderItem: navigateFavorites},
    {id: 3, name: 'Excluir conta', icon: 'trash-2', handleRenderItem: openModalDeleteUser}, 
    {id: 4, name: 'Sair', icon: 'log-out', handleRenderItem: openModalLogoutUser},
  ]

  const dispatch = useDispatch()


  function handleLogout() {
    dispatch(setUser(null))
    dispatch(setIsGuest(false))
  }

  const [loadingButton, setLoadingButton] = useState(false)

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

  const deleteUserRef = useRef<Modalize>(null);
  const logoutUserRef = useRef<Modalize>(null);


  return (
    <S.Container>
      {isGuest ? <HeaderUserGuest handleButton={handleLogout} /> : <HeaderUser userName={user?.name || ''}/>}
      <View style={{flex: 1, padding: 16}}>
        <FlashList
          estimatedItemSize={RFValue(48)}
          estimatedListSize={{height: userOptions.length * RFValue(48), width: Dimensions.get('screen').width}}
          data={userOptions}
          renderItem={RenderItem}
        />
      </View>
      <FooterCopyright/>
      <ModelDeleteAccount modalRef={deleteUserRef} handleConfirm={deleteAccount} loadingButton={loadingButton}/>
      <ModelLogout modalRef={logoutUserRef} handleConfirm={handleLogout}/>
    </S.Container>
  )
}