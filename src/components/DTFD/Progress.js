import React, { useContext } from 'react'
import { Caption, ProgressBar, Colors } from 'react-native-paper';
import { DTFDContext } from './Context';

export default function Progress() {
    const DTFD = useContext(DTFDContext)

    const Progress = () => {
        if(DTFD.downloadQueued) {
            return(<ProgressBar progress={DTFD.currentStatus} color={Colors.red800} />)
        }
        return(<></>)
    }

    const ProgressText = () => {
        if(DTFD.currentAmountOfTracks > 0 || DTFD.amountOfTracks > 0) {
            return(<Caption>{DTFD.currentAmountOfTracks} / {DTFD.amountOfTracks}</Caption>);
        }
        return(<></>);
    }

    return(
        <>
            {Progress()}
            {ProgressText()}
        </>
    )
}