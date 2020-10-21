import React, { useContext, useState } from 'react'
import { ServerSettingsContext } from './../ServerSettingsContext';
import SQLite from 'react-native-sqlite-storage';

export const FSTTDContext = React.createContext(null);

export function FSTTDProvider(props) {
    const [currentStatus, setcurrentStatus] = useState("");
    const [ongoing, setongoing] = useState(false);
    const ServerSettings = useContext(ServerSettingsContext);

    async function GetListOfStarredTracksAndAlbums() {
        const starred = await GetStarredPromise();
        let final = Object.values(starred.song)

        for (let index = 0; index < starred.album.length; index++) {
            const album = await GetAlbumPromise(starred.album[index].id);
            final = [...final, ...Object.values(album.song)];
        }

        return final;
    }

    function errorCB(err) {
        console.log("SQL Error: " + err);
    }

    function successCB() {
        console.log("SQL executed fine");
    }

    function openCB() {
        console.log("Database OPENED");
    }

    function GetStarredPromise() {
        url = ServerSettings.generateURLObject('/rest/getStarred');

        return fetch(url.toString())
            .then((res) => { return res.json(); })
            .then((subsonic) => { return subsonic["subsonic-response"].starred; })
            .catch((e) => { console.error(e); });
    }

    function GetAlbumPromise(albumid) {
        url = ServerSettings.generateURLObject('/rest/getAlbum');
        url.searchParams.append("id", albumid)

        return fetch(url.toString())
            .then((res) => { return res.json(); })
            .then((subsonic) => { return subsonic["subsonic-response"].album; })
    }

    async function InsertIntoDatabase(tracks) {
        let db = await SQLite.openDatabase({ name: "Tracks.sqlite" });
        await db.transaction(tx => tx.executeSql("DROP TABLE IF EXISTS Tracks"));
        await db.transaction(async (tx) => {
            return tx.executeSql("CREATE TABLE Tracks (id INTEGER PRIMARY KEY NOT NULL, trackID VARCHAR(35))");
        })
        for (let index = 0; index < tracks.length; index++) {
            const track = tracks[index];
            one = track;

            await db.transaction(async (tx) => {
                let insertSQL = "INSERT INTO Tracks (trackID) VALUES (?)";
                await tx.executeSql(insertSQL, [track.id]);
            })
        }
    }

    const SyncToDatabase = async function () {
        setongoing(true);
        const result = await GetListOfStarredTracksAndAlbums();
        await InsertIntoDatabase(result);
        setcurrentStatus("Successful fetch at " + new Date(Date.now()).toUTCString() + " with " + result.length + " tracks");
        setongoing(false);
    }

    return (
        <FSTTDContext.Provider value={
            { currentStatus, setcurrentStatus, ongoing, setongoing, SyncToDatabase }
        }>
            {props.children}
        </FSTTDContext.Provider>
    )
}