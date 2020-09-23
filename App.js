import React, { useState } from "react";
import { View } from "react-native";
import { Provider, DefaultTheme } from "react-native-paper";
import SQLite from 'react-native-sqlite-storage';

//SQLite.enablePromise(true);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

import WIPAllView from './src/view/WIPAllView';
import Top from './src/view/top';
import { ServerSettingsProvider } from './src/components/ServerSettingsContext';

const App = () => {
  return (
    <Provider theme={theme}>
      <ServerSettingsProvider>
        <View>
          <Top/>
          <WIPAllView/>
        </View>
      </ServerSettingsProvider>
    </Provider>
  );
};

export default App;
