import { createStackNavigator } from "@react-navigation/stack"
import { UserAccount } from "../Screens/UserAccount"
import { EditUserAccount } from "../Screens/EditUserAccount"
import { Favorites } from "../Screens/Favorites"

const Stack = createStackNavigator()   

export const UserRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='UserAccount' screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserAccount" component={UserAccount}/>
      <Stack.Screen name="EditUserAccount" component={EditUserAccount}/>
      <Stack.Screen name="Favorites" component={Favorites}/>
    </Stack.Navigator>
  )
}