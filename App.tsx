import React from 'react';
import { TabRoutes } from './src/Routes/tab.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import themes from './src/Global/themes';
const Stack = createStackNavigator()   

function App(): React.JSX.Element {

  return (
    <ThemeProvider theme={themes}>
       <NavigationContainer>
        <Stack.Navigator initialRouteName='TabRoutes'>
          <Stack.Screen name='TabRoutes' component={TabRoutes} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
