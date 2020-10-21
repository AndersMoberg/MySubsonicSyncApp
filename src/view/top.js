import React, { useContext } from "react";
import { Appbar } from 'react-native-paper';
import { RuntimeContext, VIEW_ENUM } from '../components/RuntimeContext';

const Top = () => {
  const Runtime = useContext(RuntimeContext)
  const goToSettings = () => {
    Runtime.setAppState(VIEW_ENUM.SETTINGS);
  }

  return (
    <Appbar.Header>
      <Appbar.Content title="Subsonic Sync App" subtitle="by Anders Moberg" />
      <Appbar.Action icon="cog" onPress={goToSettings}/>
    </Appbar.Header>
  );
};

export default Top;