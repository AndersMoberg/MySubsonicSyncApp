import React, {  useState } from "react";
import { View } from "react-native";
import { Provider, DefaultTheme, Appbar } from "react-native-paper";

import { ServerSettingsProvider } from './src/components/ServerSettingsContext';
import { RuntimeProvider, VIEW_ENUM } from './src/components/RuntimeContext';
import SettingServerDetails from './src/components/SettingServerDetails';
import WIPAllView from './src/view/Main';
import Top from './src/view/top';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  const [appState, setAppState] = useState(VIEW_ENUM.APP);

  const AppView = () => {
    return (<>
      <Top />
      <WIPAllView />
    </>)
  }

  const SettingsView = () => {
    return (<><Appbar.Header>
      <Appbar.BackAction onPress={() => setAppState(VIEW_ENUM.APP)} />
    </Appbar.Header>
    <SettingServerDetails /></>)
  }

  const CurrentView = () => {
    switch (appState) {
      case VIEW_ENUM.APP:
        return AppView();
      case VIEW_ENUM.SETTINGS:
        return SettingsView();
    }
  }

  return (
    <Provider theme={theme}>
      <RuntimeProvider view={setAppState}>
        <ServerSettingsProvider>
          <View>
            {CurrentView()}
          </View>
        </ServerSettingsProvider>
      </RuntimeProvider>
    </Provider>
  );
};

export default App;
