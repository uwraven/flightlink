import React, { useState, useEffect, useLayoutEffect } from 'react';
import Footer from './ApplicationFooter/ApplicationFoooter';
import styles from './app.module.scss';
import 'API/main';
import Record from './Record/Record';
import Configure from './Configure/Configure';
import CommandPalette from './CommandPalette/CommandPalette';
import { useSelector, useDispatch } from 'react-redux';
import { setCommandPaletteOpen } from '../../Store/Interface/InterfaceSlice';
import { setWebsocketConnection } from 'Store/Record/RecordSlice';
import { getPortOptions } from 'Store/Record/Device/DeviceSlice';
import ApplicationHeader from 'Views/App/ApplicationHeader/ApplicationHeader';

const App = ({ ...props }) => {
    const pages = [ Record, Configure ];

    const dispatch = useDispatch();
    const { commandPaletteOpen, selectedTab } = useSelector((state) => state.interface);
    const { websocketConnected } = useSelector((state) => state.record);

    const SelectedPage = pages[selectedTab] || Record;

    useEffect(
        () => {
            window.arcc.api.openSocket(8080).then(() => {
                dispatch(setWebsocketConnection(true));
                dispatch(getPortOptions());
            });
            return () => {
                window.arcc.api.closeSocket();
            };
        },
        [ dispatch ]
    );

    return (
        <div className={styles.app}>
            <ApplicationHeader />
            <SelectedPage />
            {commandPaletteOpen && <CommandPalette onCollapse={() => dispatch(setCommandPaletteOpen(false))} />}
            <Footer websocketConnected={websocketConnected} />
        </div>
    );
};

export default App;
