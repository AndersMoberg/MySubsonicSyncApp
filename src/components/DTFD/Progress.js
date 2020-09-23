import React, { useContext } from 'react'
import { Text, Title, Card, Button, Divider, ProgressBar, Colors } from 'react-native-paper';
import { DTFDContext } from './Context';

export default function Progress() {
    const DTFD = useContext(DTFDContext)
    return(
        <>
            <ProgressBar progress={DTFD.currentStatus} color={Colors.red800} />
        </>
    )
}