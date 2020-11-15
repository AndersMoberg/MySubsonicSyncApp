import React, { useEffect, useContext, useRef } from 'react';
import { TextInput, Card, Button } from 'react-native-paper';
import { ServerSettingsContext } from './ServerSettingsContext';

import AsyncStorage from '@react-native-community/async-storage';

export default function SettingServerDetails() {
    const ServerSettings = useContext(ServerSettingsContext);
    const ServerAddressElement = useRef(null);
    const UsernameElement = useRef(null);
    const PasswordElement = useRef(null);

    async function ApplySettings() {
        const address = ServerAddressElement.current.state.value;
        const username = UsernameElement.current.state.value;
        const password = PasswordElement.current.state.value;
        await ApplySettingsToAsync("address",address);
        await ApplySettingsToAsync("username",username);
        await ApplySettingsToAsync("password",password);
        alert("Saved!");
        ServerSettings.loadFromAsyncStorage();
    }

    async function ApplySettingsToAsync(field, text) {
        try {
            server = JSON.parse(await AsyncStorage.getItem('server'));
            server = server === null ? {} : server;

            server[field] = text;
            await AsyncStorage.setItem('server',JSON.stringify(server));
        } catch (error) {
            console.error(error);
        }
    }

    async function doAPing() {
        const pingSuccessful = await ServerSettings.doesPingWork();
        if(pingSuccessful == true) {
            alert("PING! Successful");
        } else {
            alert("Ping failed..");
        }
    }
 
    return(<Card>
        <Card.Title title="Server settings" subtitle="'Apply settings' will save settings for future sessions" />
        <Card.Content>
            <TextInput ref={ServerAddressElement} label="Server address" value={ServerSettings.ServerAddress}
                onChangeText={text => ServerSettings.setServerAddress(text)}/>
            <TextInput ref={UsernameElement} label="Username" value={ServerSettings.Username}
                onChangeText={text => ServerSettings.setUsername(text)}/>
            <TextInput ref={PasswordElement} secureTextEntry={true} label="Password" value={ServerSettings.Password}
                onChangeText={text => ServerSettings.setPassword(text)}/>
            <Button onPress={ApplySettings}>Apply settings</Button>
            <Button onPress={doAPing}>Ping server</Button>
        </Card.Content>
    </Card>)
}