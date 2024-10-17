import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import themes from './src/Global/themes';
import {SafeAreaView, StatusBar} from 'react-native'
import { persistor, store } from './src/Store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { AppRoutes } from './src/Routes/app.routes';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

function App(): React.JSX.Element {

  const statusBarHeight = StatusBar.currentHeight

  const [fontsLoader] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themes.colors.primaryColor}}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={themes}>
            <NavigationContainer>
              <AppRoutes/>
              <FlashMessage statusBarHeight={statusBarHeight}/>
            </NavigationContainer>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
