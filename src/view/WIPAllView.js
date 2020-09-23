import React, { useContext, useState } from 'react';
import FetchStarredTracksToDatabased from '../components/FetchStarredTracksToDatabase';
import DownloadTracksFromDatabase from '../components/DownloadTracksFromDatabase';
import SettingServerDetails from '../components/SettingServerDetails';

export default function WIPAllView() {
    return (
      <>
        <SettingServerDetails/>
        <FetchStarredTracksToDatabased/>
        <DownloadTracksFromDatabase/>
      </>
    );
}