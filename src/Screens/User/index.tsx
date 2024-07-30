import { View } from "react-native"
import * as S from './style'
import { GlobalButton } from "../../Components/GlobalButton"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import { HeaderUserGuest } from "./Components/HeaderUserGuest"
import { useDispatch, useSelector } from "react-redux"
import { setIsGuest, setUser } from "../../Store/user"
import { RootState } from "../../Store/store"
import { colors } from "../../Components/GlobalTextComponent/style"
import { HeaderUser } from "./Components/HeaderUser"

export const UserAccount = () => {

  const userOptions = [
    {id: 1, name: 'Editar dados', icon: 'edit'},
    {id: 2, name: 'Favoritos', icon: 'heart'},
    {id: 3, name: 'Excluir conta', icon: 'trash-2'},
  ]

  const dispatch = useDispatch()

  const {isGuest, user} = useSelector((store: RootState) => store.user)

  function handleLogout() {
    dispatch(setUser(null))
    dispatch(setIsGuest(false))
  }
  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}
  return (
    <S.Container>
      {isGuest ? <HeaderUserGuest handleButton={handleLogout} /> : <HeaderUser userName={user?.name || ''}/>}
    </S.Container>
  )
}