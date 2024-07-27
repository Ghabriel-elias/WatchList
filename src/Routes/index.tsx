import { useSelector } from "react-redux"
import { RootState } from "../Store/store"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"

export const Routes = () => {

  const {user, isGuest} = useSelector((store: RootState) => store.user)

   return (
    user || isGuest ? <AppRoutes/> : <AuthRoutes/>
   )     
}