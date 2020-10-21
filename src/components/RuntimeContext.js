import React, { useState, useEffect } from 'react'

export const RuntimeContext = React.createContext(null);
export const VIEW_ENUM = {
    APP: 0,
    SETTINGS: 1
};

export function RuntimeProvider(props) {
    const setAppState = (value) => {
        props.view(value);
    }

    return <RuntimeContext.Provider value={
        {setAppState}
    }>
        {props.children}
    </RuntimeContext.Provider>;
}
