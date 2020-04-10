import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Footer from './Views/Footer/Footer';
import styles from './app.module.scss';
import './constants.css';
import './API/main';
import Record from './Views/Record/Record';
import Configure from './Views/Configure/Configure';
import TabBar from './Components/TabBar/TabBar';
import CommandPalette from './Views/CommandPalette/CommandPalette';

const App = ({ commandPaletteVisibility, ...props }) => {
    const pages = [ Record, Configure ];

    const [ page, setPage ] = useState(0);
    const [ connected, setConnection ] = useState(false);
    const SelectedPage = pages[page] || Record;

    console.log(props);

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
            <SelectedPage />
            {commandPaletteVisibility && <CommandPalette />}
            <Footer websocketConnected={connected} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        commandPaletteVisibility: state.Interface.commandPaletteVisibility
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
