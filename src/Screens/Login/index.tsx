import { LoginView } from "./view"
import { useLoginModel } from "./model"

export const Login = () => {

  const loginModel = useLoginModel()

  return (
    <LoginView {...loginModel}/>
  )
}