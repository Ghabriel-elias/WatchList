import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import themes from './src/Global/themes';
import {SafeAreaView, StatusBar} from 'react-native'
import { persistor, store } from './src/Store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from './src/Routes';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {

  const statusBarHeight = StatusBar.currentHeight

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themes.colors.primaryColor}}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={themes}>
            <NavigationContainer>
              <Routes/>
              <FlashMessage statusBarHeight={statusBarHeight}/>
            </NavigationContainer>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
