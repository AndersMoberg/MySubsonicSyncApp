import React, { useContext } from 'react'
import { Text, Button, Title, Card, Divider, ProgressBar, Colors } from 'react-native-paper';

import { FSTTDContext } from './Context';

export default function FSTTDButton() {
    const FSTTD = useContext(FSTTDContext)

    return(<Button loading={FSTTD.ongoing} mode="contained" onPress={FSTTD.SyncToDatabase}>Sync list of tracks</Button>);
}

