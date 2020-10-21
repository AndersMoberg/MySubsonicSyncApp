import React, { useContext, useState } from 'react';
import FetchStarredTracksToDatabased from '../components/FetchStarredTracksToDatabase';
import DownloadTracksFromDatabase from '../components/DownloadTracksFromDatabase';

export default function WIPAllView() {
    return (
      <>
        <FetchStarredTracksToDatabased/>
        <DownloadTracksFromDatabase/>
      </>
    );
}