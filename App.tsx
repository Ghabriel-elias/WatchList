import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import themes from './src/Global/themes';
import {SafeAreaView} from 'react-native'
import { AppRoutes } from './src/Routes/app.routes';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themes.colors.primaryColor}}>
      <ThemeProvider theme={themes}>
        <NavigationContainer>
          <AppRoutes/>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
