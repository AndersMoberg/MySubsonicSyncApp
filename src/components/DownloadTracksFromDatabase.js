import * as React from 'react';
import { Text, Title, Card, Button, Divider, ProgressBar, Colors } from 'react-native-paper';
import { DTFDProvider } from './DTFD/Context';
import Progress from './DTFD/Progress';
import DTFDButton from './DTFD/Button';

export default function DownloadTracksFromDatabase() {
    return (
        <DTFDProvider>
            <Card>
                <Card.Content>
                    <DTFDButton/>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Progress />
                </Card.Content>
            </Card>
        </DTFDProvider>
    )
}