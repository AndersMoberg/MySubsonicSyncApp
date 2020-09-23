import React, { useContext } from 'react'
import { Text, PaperButton, Title, Card, Divider, ProgressBar, Colors } from 'react-native-paper';

import { FSTTDContext } from './Context';

export default function FSTTDStatus() {
    const FSTTD = useContext(FSTTDContext)

    return (<Text>{FSTTD.currentStatus}</Text>);
}