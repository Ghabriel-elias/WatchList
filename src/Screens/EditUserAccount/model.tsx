import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store/store"
import { useRef, useState } from "react"
import { Modalize } from "react-native-modalize"
import { globalMessage } from "../Functions/useGlobalMessage"
import { setIsGuest, setUser } from "../../Store/user"
import { checkPassword, editUserRequest } from "../../Services/auth"

export const useControllerEditUser = () => {
  
  const {user} = useSelector((store: RootState) => store.user)
  const initialValuesForm = {
    name: user?.name || '',
    email: user?.email || '',
  }
  const dispatch = useDispatch()
  const modalConfirmPassRef = useRef<Modalize>(null)
  const userEditData = useRef(initialValuesForm)
  const [loading, setLoading] = useState(false)

 
  function handleSubmitForm(values: typeof initialValuesForm) {
    modalConfirmPassRef.current?.open()
    userEditData.current = values
  }   

  function handleLogout() {
    dispatch(setUser(null))
    dispatch(setIsGuest(false))
  }

  function checkToken() {
    const token = user?.token
    if(!token) {
      handleLogout()
      throw new Error('Usuário não autorizado, por favor faça login novamente')
    }
    return token
  }

  async function editUserAccount() {
    try {
      const token = checkToken()
      const response = await editUserRequest(token, userEditData.current)
      if(response?.user && response?.token) {
        dispatch(setUser({...response?.user, token: `Bearer ${response?.token}`}))
        globalMessage({message: 'Usuário atualizado com sucesso', type: 'success'})
        modalConfirmPassRef.current?.close()
      }
    } catch (error: any) {
      const catchError = error?.message
      globalMessage({message: catchError, type: 'danger'})
    } finally {
      setLoading(false)
    }
  }

  async function confirmPassword(password: string) {
    try {
      setLoading(true)
      const token = checkToken()
      const response = await checkPassword(token, password)
      if(response === 204) {
        editUserAccount()
      }
    } catch (error: any) {
      const catchError = error?.message
      globalMessage({message: catchError, type: 'danger'})
      setLoading(false)
    }
  }

  return {
    initialValuesForm,
    handleSubmitForm,
    loading,
    modalConfirmPassRef,
    confirmPassword
  }
}