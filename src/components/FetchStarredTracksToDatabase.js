import * as React from 'react';
import { Text, Title, Card, Divider, ProgressBar, Colors } from 'react-native-paper';

import FSTTDButton from './FSTTD/Button';
import FSTTDStatus from './FSTTD/Status';
import { FSTTDProvider } from './FSTTD/Context';

export default function FetchStarredTracksToDatabase() {
    return (
        <FSTTDProvider>
            <Card>
                <Card.Content>
                    <FSTTDButton/>
                    <Divider/>
                    <FSTTDStatus/>
                </Card.Content>
            </Card>
       </FSTTDProvider>
    );
}