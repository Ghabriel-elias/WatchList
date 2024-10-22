import { createStackNavigator } from "@react-navigation/stack"
import { TabRoutes } from "./tab.routes"
import { MediaHubDetails } from "../Screens/MediaHubDetails"
import { Search } from "../Screens/Search"
import { PersonDetails } from "../Screens/PersonDetails"

const Stack = createStackNavigator()   

export const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='TabRoutes'>
      <Stack.Screen name='TabRoutes' component={TabRoutes} options={{
        headerShown: false
      }} />
      <Stack.Screen name="MediaHubDetails" component={MediaHubDetails} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="PersonDetails" component={PersonDetails} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Search" component={Search} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
}