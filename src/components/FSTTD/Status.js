import React, { useContext } from 'react'
import { Caption } from 'react-native-paper';

import { FSTTDContext } from './Context';

export default function FSTTDStatus() {
    const FSTTD = useContext(FSTTDContext)

    return (<Caption>{FSTTD.currentStatus}</Caption>);
}