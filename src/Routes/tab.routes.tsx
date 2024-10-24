import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {Feather} from '@expo/vector-icons'
import { Home } from '../Screens/Home'
import themes from '../Global/themes'
import { Favorites } from '../Screens/Favorites'

const icons = {
  Home: {
    name: "home"
  },
  Favorites: {
    name: "heart"
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
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ size, focused }) => {
          const { name } = icons[route.name]
          return <Feather name={name} size={size} color={focused ? colors.secundaryColor : colors.disactiveTabBar} />
        }
      })}
    >
      <Tab.Screen name='Home' options={{
        title: 'Início'
      }} component={Home} />
      <Tab.Screen name='Favorites' component={Favorites} options={{
        title: 'Favoritos'
      }} />
      {/* <Tab.Screen name='UserAccount' component={UserRoutes} options={{
        title: 'Perfil'
      }}/> */}
    </Tab.Navigator>
  )
}

