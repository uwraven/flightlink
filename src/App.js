import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Footer from './Views/Footer/Footer';
import styles from './app.module.scss';
import './API/main';
import Record from './Views/Record/Record';
import Configure from './Views/Configure/Configure';
import TabBar from './Components/TabBar/TabBar';
import CommandPalette from './Views/CommandPalette/CommandPalette';
import TelemetryController from 'Views/TelemetryController/TelemetryController';
import { useSelector, useDispatch } from 'react-redux';
import { setCommandPaletteVisibility } from './Redux/Interface/InterfaceSlice';
import { setWebsocketConnection } from 'Redux/Record/RecordSlice';
import API from './API/constants';

const App = ({ ...props }) => {
    const pages = [ Record, Configure ];

    const dispatch = useDispatch();
    const { commandPaletteVisibility } = useSelector((state) => state.interface);
    const { websocketConnected } = useSelector((state) => state.record);

    const [ page, setPage ] = useState(0);
    const SelectedPage = pages[page] || Record;

    useEffect(() => {
        window.arcc.api.openSocket(8080).then(() => {
            dispatch(setWebsocketConnection(true));
            window.arcc.api.sendRequest(
                {
                    type: API.requests.ACTION,
                    action: API.actions.LISTSERIAL
                },
                (response) => {
                    if (response.status === 200) {
                        console.log(response.payload);
                    }
                }
            );
        });
        return () => {
            window.arcc.api.removeSocket(8080).then(() => {});
        };
    }, []);

    return (
        <div className={styles.app}>
            <TabBar
                options={[ 'Record', 'Configure' ]}
                selected={page}
                onClick={(index) => {
                    if (index !== page) setPage(index);
                }}
                className={styles.tabbar}
            />
            <div className={styles.main}>
                {/* <SelectedPage /> */}
                <TelemetryController />
            </div>
            {commandPaletteVisibility && <CommandPalette />}
            <Footer websocketConnected={websocketConnected} />
        </div>
    );
};

export default App;
