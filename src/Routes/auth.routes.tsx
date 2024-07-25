import { createStackNavigator } from "@react-navigation/stack"
import { AuthView } from "../Screens/Auth"

const Stack = createStackNavigator()   

export const AuthRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='AuthView' screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthView" component={AuthView}/>
    </Stack.Navigator>
  )
}