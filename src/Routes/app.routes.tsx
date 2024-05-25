import { createStackNavigator } from "@react-navigation/stack"
import { TabRoutes } from "./tab.routes"
import { ShowsDetails } from "../Screens/ShowsDetails"

const Stack = createStackNavigator()   

export const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='TabRoutes'>
      <Stack.Screen name='TabRoutes' component={TabRoutes} options={{
        headerShown: false
      }} />
      <Stack.Screen name="ShowsDetails" component={ShowsDetails}/>
    </Stack.Navigator>
  )
}