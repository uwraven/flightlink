import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfigurationHeader.module.scss';
import TextInput from 'Components/Inputs/TextInput/TextInput';

const ConfigurationHeader = (props) => {

    const id = useSelector(state => state.interface.editor.configurations.selectedConfigurationId);
    const configuration = useSelector(state => state.data.workspace.configurations.configurationEntities[id])

    return(
        <div className={styles.container}>
            <TextInput
                initialValue={configuration.name}
                placeholder={"Configuration Name"}
                onSubmit={() => {}}
                width={120}
            />
        </div>
    )
}

export default ConfigurationHeader;
