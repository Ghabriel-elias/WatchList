import { createStackNavigator } from "@react-navigation/stack"
import { Login } from "../Screens/Login"
import { Register } from "../Screens/Register"

const Stack = createStackNavigator()   

export const AuthRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  )
}