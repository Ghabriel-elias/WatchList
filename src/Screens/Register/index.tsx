import { useRegisterModel } from './model';
import { RegisterView } from './view';

export const Register = () => {

  const registerModel = useRegisterModel()

  return (
    <RegisterView {...registerModel}/>
  )
}