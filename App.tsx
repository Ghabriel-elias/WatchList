import React from 'react';
import { TabRoutes } from './src/Routes/tab.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import themes from './src/Global/themes';
const Stack = createStackNavigator()   
import {SafeAreaView} from 'react-native'

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themes.colors.primaryColor}}>
      
    <ThemeProvider theme={themes}>
       <NavigationContainer>
        <Stack.Navigator initialRouteName='TabRoutes'>
          <Stack.Screen name='TabRoutes' component={TabRoutes} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
          </SafeAreaView>
  );
}

export default App;
