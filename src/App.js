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
import ActivePanel from './Components/Core/ActivePanel/ActivePanel';
import Collapsible, { CollapsibleSection, CollapsibleSubsection } from 'Components/Collapsible/Collapsible';
import DropdownSelect from 'Components/DropdownSelect/DropdownSelect';

const App = ({ commandPaletteVisibility, ...props }) => {
    const pages = [ Record, Configure ];

    const [ page, setPage ] = useState(0);
    const [ connected, setConnection ] = useState(false);
    const SelectedPage = pages[page] || Record;
    const [ selected, setSelected ] = useState(-1);

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
                <SelectedPage />
                <div style={{ width: 250 }}>
                    <CollapsibleSection title={'Section'}>:-)</CollapsibleSection>
                    <CollapsibleSubsection title={'Subsection'}>DFHASDFH</CollapsibleSubsection>
                    <DropdownSelect
                        placeholder={'0'}
                        options={[ '0', '1', '2' ]}
                        selected={selected}
                        select={(i) => setSelected(i)}
                    />
                </div>
            </div>
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
