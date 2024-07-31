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

export const UserAccount = () => {

  const {navigate} = useNavigation()

  const userOptions = [
    {id: 1, name: 'Editar dados', icon: 'edit', handleRenderItem: () => navigate('EditUserAccount')},
    {id: 2, name: 'Favoritos', icon: 'heart', handleRenderItem: () => navigate('Favorites')},
    {id: 3, name: 'Excluir conta', icon: 'trash-2', handleRenderItem: () => 'abrir modal'}, 
    {id: 4, name: 'Sair', icon: 'log-out', handleRenderItem: () => 'abrir modal'},
  ]

  const dispatch = useDispatch()

  const {isGuest, user} = useSelector((store: RootState) => store.user)

  function handleLogout() {
    dispatch(setUser(null))
    dispatch(setIsGuest(false))
  }

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
    </S.Container>
  )
}