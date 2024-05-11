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
        tabBarIcon: ({ size }) => {
          const { name } = icons[route.name]
          return <Feather name={name} color={colors.primaryColor} size={size} />
        }
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='MoviesFavorites' component={MoviesFavorites} />
    </Tab.Navigator>
  )
}

