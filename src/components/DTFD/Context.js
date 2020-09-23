import React, { useContext, useState } from 'react'
import { PermissionsAndroid } from "react-native";
import { ServerSettingsContext } from './../ServerSettingsContext';
import SQLiteWrapper from '../../lib/SQLiteWrapper';
import RNFetchBlob from 'rn-fetch-blob'

const dirs = RNFetchBlob.fs.dirs;
export const DTFDContext = React.createContext(null);

export function DTFDProvider(props) {
    const [currentStatus, setcurrentStatus] = useState(1);
    const ServerSettings = useContext(ServerSettingsContext);

    async function GetAllTracks() {
        let db = new SQLiteWrapper("Tracks");
        let trackIDs = await db.queryPromise("SELECT trackID FROM Tracks");
        let result = [];
        var len = trackIDs.rows.length;
        for (let i = 0; i < len; i++) {
            result.push(trackIDs.rows.item(i));
        }
        return result;
    }

    function GenerateSongPath(track) {
        const album = track.album;
        const artist = track.artist;
        const title = track.title;
        const discNumber = track.discnumber;
        const trackNumber = track.track;
        const suffix = track.transcodedSuffix || track.suffix;

        return dirs.MusicDir + '/' +
            'SyncedFromSubsonic/' +
            (album ? album + "/" : "") +
            (discNumber ? discNumber + "." : "") +
            (trackNumber ? trackNumber + "." : "") +
            artist +
            " - " +
            title +
            '.' + suffix;
    }

    function GetPermissionsPromise() {
        return new Promise((resolve, reject) => {
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                { title: "Cool Photo App Camera Permission", message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.", buttonNeutral: "Ask Me Later", buttonNegative: "Cancel", buttonPositive: "OK" }
            ).then((status) => { if (status === PermissionsAndroid.RESULTS.GRANTED) { resolve(); } reject(); })
        })
    }

    function GetStreamTrackPromise(id, path) {
        finalURL = ServerSettings.generateURLObject('/rest/stream');
        finalURL.searchParams.append("id", id)
        return FetchBlobPath(url.toString(), path);
    }

    function FetchBlobPath(url, path) {
        return RNFetchBlob
            .config({ path: path })
            .fetch('GET', url)
            .then(res => res.path())
            .catch((e) => { console.error(e); })
    }

    async function CheckFolderAndCreate() {
        exists = await RNFetchBlob.fs.exists(dirs.MusicDir + '/SyncedFromSubsonic/');
        if (exists == false) {
            await RNFetchBlob.fs.mkdir(dirs.MusicDir + '/SyncedFromSubsonic/').catch((e) => { console.error(e); });
        }
    }

    function DoesFileExists(filepath) {
        return RNFetchBlob.fs.exists(filepath).catch((e) => { console.error(e); });
    }

    function GetTrackDetailsPromise(trackid) {
        finalURL = ServerSettings.generateURLObject('/rest/getSong');
        finalURL.searchParams.append("id", trackid)

        return fetch(finalURL.toString())
            .then((res) => { return res.json(); })
            .then((subsonic) => { return subsonic["subsonic-response"].song; })
    }



    const BeginDownload = async function () {
        await GetPermissionsPromise();
        tracks = await GetAllTracks();
        tracksAmount = tracks.length;
        for (let index = 0; index < tracksAmount; index++) {
            const trackId = tracks[index].trackID;
            const track = await GetTrackDetailsPromise( trackId);
            const filepath = GenerateSongPath(track);

            if ((await DoesFileExists(filepath)) == false) {
                await GetStreamTrackPromise(trackId, filepath);
            }
            console.log("index " + index + " out of " + tracksAmount);
            const percentage = index / tracks.length;
            console.log("percentage done: " + percentage);
            setcurrentStatus(percentage);
        }
    }

    return (
        <DTFDContext.Provider value={
            { currentStatus, setcurrentStatus, BeginDownload }
        }>
            {props.children}
        </DTFDContext.Provider>
    )
}