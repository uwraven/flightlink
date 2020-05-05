import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Footer from './Views/ApplicationFooter/ApplicationFoooter';
import styles from './app.module.scss';
import './API/main';
import Record from './Views/Record/Record';
import Configure from './Views/Configure/Configure';
import CommandPalette from './Views/CommandPalette/CommandPalette';
import { useSelector, useDispatch } from 'react-redux';
import { setCommandPaletteOpen } from './Redux/Interface/InterfaceSlice';
import { setWebsocketConnection } from 'Redux/Record/RecordSlice';
import { getPortOptions } from 'Redux/Record/Device/DeviceSlice';
import ApplicationHeader from 'Views/ApplicationHeader/ApplicationHeader';

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
