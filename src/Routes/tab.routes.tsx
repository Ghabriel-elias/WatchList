import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather'
import { Home } from '../Screens/Home'
import themes from '../Global/themes'
import { UserAccount } from '../Screens/UserAccount'
import { SearchShows } from '../Screens/SearchShows'

const icons = {
  Home: {
    name: "home"
  },
  SearchShows: {
    name: "search"
  },
  UserAccount: {
    name: "user"
  },
}
const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()   

const {colors} = themes

export const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: colors.disactiveTabBar,
        tabBarStyle: {
          backgroundColor: colors.primaryColor,
          borderTopColor: colors.secundaryColor,
          height: 55,
          paddingBottom: 5
        },
        tabBarIcon: ({ size, focused }) => {
          const { name } = icons[route.name]
          return <Feather name={name} size={size} color={focused ? colors.secundaryColor : colors.disactiveTabBar} />
        }
      })}
    >
      <Tab.Screen name='Home' options={{
        title: 'Início'
      }} component={Home} />
      <Tab.Screen name='SearchShows' component={SearchShows} options={{
        title: 'Pesquisar'
      }} />
      <Tab.Screen name='UserAccount' component={UserAccount} options={{
        title: 'Perfil'
      }}/>
    </Tab.Navigator>
  )
}

