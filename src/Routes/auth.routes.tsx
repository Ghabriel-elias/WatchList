import { createStackNavigator } from "@react-navigation/stack"
import { Login } from "../Screens/Login"

const Stack = createStackNavigator()   

export const AuthRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
  )
}