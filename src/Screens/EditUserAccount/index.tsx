import { useControllerEditUser } from "./model"
import { EditUserAccountView } from "./view"

export const EditUserAccount = () => {
  
  const userModel = useControllerEditUser()

  return (
    <EditUserAccountView {...userModel}/>
  )
}