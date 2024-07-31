import { useControllerUser } from "./model"
import { UserAccountView } from "./view"

export const UserAccount = () => {

  const userAccountModel = useControllerUser()

  return (
    <UserAccountView {...userAccountModel}/>
  )
}