import { useRef, useState } from "react"
import {TextInput } from "react-native"
import { useDispatch } from "react-redux"
import { setIsGuest, setUser } from "../../Store/user"
import { login } from "../../Services/auth"
import { globalMessage } from "../Functions/useGlobalMessage"
import { getApplicationName } from "react-native-device-info"

export const useLoginModel = () => {
  console.log(getApplicationName())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputRef = useRef<TextInput>()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  function handleGuest() {
    dispatch(setIsGuest(true))
  }

  async function handleLogin() {
    try {
      setLoading(true)
      const {token, user} = await login(email, password)
      dispatch(setUser({...user, token}))
    } catch (error: any) {
      const catchError = error.message
      globalMessage({message: catchError, type: 'danger'})
    } finally {
      setLoading(false)
    }
  }

  return {
    setEmail,
    email,
    setPassword,
    password,
    inputRef, 
    loading,
    handleGuest,
    handleLogin
  }
}