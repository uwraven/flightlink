import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Editor.module.scss';
import SignalEditor from './SignalEditor/SignalEditor';
import ConfigurationTable from './ConfigurationTable/ConfigurationTable';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader';

const Editor = (props) => {

    const { selectedConfigurationId } = useSelector(state => state.interface.editor.configurations)

    return(
        <div className={styles.container}>
            <ConfigurationTable/>
            { (selectedConfigurationId) ?
                <div className={styles.signalEditor}>
                    <ConfigurationHeader/>
                    <SignalEditor/>
                </div>
            :
                <div className={styles.empty}>
                    Select Configuration
                </div>
            }
        </div>
    )
}

export default Editor;
