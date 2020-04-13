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

const App = ({ ...props }) => {
    const pages = [ Record, Configure ];

    const dispatch = useDispatch();
    useSelector((state) => console.log(state));
    const { commandPaletteVisibility } = useSelector((state) => state.interface);

    const [ page, setPage ] = useState(0);
    const [ connected, setConnection ] = useState(false);
    const SelectedPage = pages[page] || Record;

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
            <Footer websocketConnected={connected} />
        </div>
    );
};

export default App;
