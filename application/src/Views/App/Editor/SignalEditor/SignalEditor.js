import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './SignalEditor.module.scss';
import SignalTable from './SignalTable/SignalTable';
import SignalForm from './SignalForm/SignalForm';

const SignalEditor = ({signalId, ...props}) => {

    const { selectedSignalId } = useSelector((state) => state.interface.editor.signals);

    return(
        <div className={styles.container}>
            <SignalTable/>
            { (selectedSignalId) ? 
                <SignalForm/> : 
                <div className={styles.empty}>
                    Select Signal
                </div>
            }
        </div>
    )
};

export default SignalEditor