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
                    <Text>On button, fetch tracks in embedded database and stream each one</Text>
                    <Text>Should skip all tracks already downloaded</Text>
                    <DTFDButton/>
                    <Text>Progress should be updated below</Text>
                    <Progress />
                </Card.Content>
            </Card>
        </DTFDProvider>
    )
}