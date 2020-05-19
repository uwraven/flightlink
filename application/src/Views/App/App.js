import React, { useState, useEffect, useLayoutEffect } from 'react';
import Footer from './ApplicationFooter/ApplicationFoooter';
import styles from './app.module.scss';
import Record from './Record/Record';
import Editor from './Editor/Editor';
import CommandPalette from './CommandPalette/CommandPalette';
import { useSelector, useDispatch } from 'react-redux';
import { setCommandPaletteOpen } from '../../Store/Interface/Interface';
import { setWebsocketConnection } from 'Store/Interface/Recorder/Socket';
import { getPortOptions } from 'Store/Interface/Recorder/Device';
import { getWorkspace } from 'Store/Data/Workspace/Meta';
import ApplicationHeader from 'Views/App/ApplicationHeader/ApplicationHeader';

const App = ({ ...props }) => {
    const pages = [ Record, Editor ];

    const dispatch = useDispatch();

    const { commandPaletteOpen, selectedTab } = useSelector((state) => state.interface.dangerous);
    const { websocketConnected } = useSelector((state) => state.interface.recorder.socket);

    const SelectedPage = pages[selectedTab] || Record;

    useEffect(
        () => {
            dispatch(getWorkspace())
        },
        [ dispatch ]
    );

    return (
        <div className={styles.app}>
            <ApplicationHeader/>
            <SelectedPage />
            {commandPaletteOpen && <CommandPalette onCollapse={() => dispatch(setCommandPaletteOpen(false))} />}
            <Footer websocketConnected={websocketConnected} />
        </div>
    );
};

export default App;
