import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Editor.module.scss';
import SignalTable from './SignalTable/SignalTable';
import ConfigurationTable from './ConfigurationTable/ConfigurationTable';

const Editor = (props) => {

    return(
        <div className={styles.container}>
            <ConfigurationTable/>
            <div className={styles.signalEditor}>
                {/* <ConfigurationHeader/> */}
                <SignalTable/>
                {/* <SignalEditor/> */}
            </div>
        </div>
    )
}

export default Editor;
