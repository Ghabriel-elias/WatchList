import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { setIsGuest } from '../../Store/user';
import { useDispatch } from 'react-redux';
import { register } from '../../Services/auth';
import { globalMessage } from '../Functions/useGlobalMessage';

export const useRegisterModel = () => {

  const [loading, setLoading] = useState(false)
  const {goBack} = useNavigation()
  const dispatch = useDispatch()

  function handleGuest() {
    dispatch(setIsGuest(true))
  }

  const initialValuesForm = { 
    name: '', 
    email: '', 
    password: '' 
  }

  async function handleSubmitForm(values: typeof initialValuesForm) {
    try {
      setLoading(true)
      const {email, name, password} = values
      const response = await register(name, email, password)
      if (response) {
        globalMessage({message: 'Usuário cadastrado com sucesso', type: 'success'})
        goBack()
      }
    } catch (error: any) {
      const catchMessage = error.message
      globalMessage({message: catchMessage, type: 'danger'})
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    initialValuesForm,
    handleGuest, 
    handleSubmitForm,
    goBack
  }
}