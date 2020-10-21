import React, { useContext } from 'react'
import { Text, Button, Title, Card, Divider, ProgressBar, Colors } from 'react-native-paper';

import { DTFDContext } from './Context';

export default function DTFDButton() {
    const DTFD = useContext(DTFDContext)

    return(<Button loading={DTFD.downloadQueued} mode="contained" onPress={DTFD.BeginDownload}>Start syncing</Button>);
}

