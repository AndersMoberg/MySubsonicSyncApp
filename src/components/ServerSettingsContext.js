import React, { useEffect, useState } from 'react'
import md5 from 'md5-hex'
import AsyncStorage from '@react-native-community/async-storage';

export const ServerSettingsContext = React.createContext(null);

export function ServerSettingsProvider(props) {
    const [ServerAddress, setServerAddress] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const generateURLObject = (uri) => {
        const salt = new Date().getTime().toString()
        url = new URL(uri, ServerAddress);
        url.searchParams.append("u", Username)
        url.searchParams.append("s", salt)
        url.searchParams.append("t", md5(Password + salt))
        url.searchParams.append("v", "1.8.0")
        url.searchParams.append("c", "Anders Moberg's Subsonic Sync App")
        url.searchParams.append("f", "json")
        return url;
    }

    useEffect(() => {
        loadFromAsyncStorage();
    }, []);

    async function loadFromAsyncStorage() {
        try {
            server = JSON.parse(await AsyncStorage.getItem('server'));
            if (server && server.address !== undefined) {
                setServerAddress(server.address);
            }
            if (server && server.username !== undefined) {
                setUsername(server.username);
            }
            if (server && server.password !== undefined) {
                setPassword(server.password);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <ServerSettingsContext.Provider value={
        { ServerAddress, setServerAddress, Username, setUsername, Password, setPassword, generateURLObject, loadFromAsyncStorage }
    }>
        {props.children}
    </ServerSettingsContext.Provider>;
}
