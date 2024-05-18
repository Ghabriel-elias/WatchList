import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather'
import { Home } from '../Screens/Home'
import { MoviesFavorites } from '../Screens/Search'
import { Search } from '../Screens/MoviesFavorites'
import themes from '../Global/themes'

const icons = {
  Home: {
    name: "home"
  },
  Search: {
    name: "search"
  },
  MoviesFavorites: {
    name: "bookmark"
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
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='MoviesFavorites' component={MoviesFavorites} />
    </Tab.Navigator>
  )
}

