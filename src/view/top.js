import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Top = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Subsonic Sync App" subtitle="by Anders Moberg" />
    </Appbar.Header>
  );
};

export default Top;