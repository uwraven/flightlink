import React, { useState } from 'react';
import styles from './TelemetryController.module.scss';
import { CollapsibleSubsection, CollapsibleSection } from 'Components/Collapsible/Collapsible';
import InputRow from 'Components/Presentation/InputRow/InputRow';
import DropdownSelect from 'Components/DropdownSelect/DropdownSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectConnection, selectProtocol, selectPort } from 'Redux/Record/Device/DeviceSlice';
import { PrimaryButton } from 'Components/Button/Button';

const TelemetryController = (...props) => {
    const dispatch = useDispatch();
    const {
        connectionOptions,
        protocolOptions,
        portOptions,
        selectedConnection,
        selectedProtocol,
        selectedPort
    } = useSelector((state) => state.device);

    return (
        <div className={styles.container}>
            <CollapsibleSection title={'Connect Device'} initialState={true}>
                <InputRow>
                    <span>Connection</span>
                    <DropdownSelect
                        options={connectionOptions}
                        selected={selectedConnection}
                        onSelect={(i) => dispatch(selectConnection(i))}
                        disabled={false}
                    />
                </InputRow>
                <InputRow>
                    <span>Protocol</span>
                    <DropdownSelect
                        options={protocolOptions}
                        selected={selectedProtocol}
                        onSelect={(i) => dispatch(selectProtocol(i))}
                        disabled={selectedConnection < 0}
                    />
                </InputRow>
                <InputRow>
                    <span>Port</span>
                    <DropdownSelect
                        options={portOptions}
                        selected={selectedPort}
                        onSelect={(i) => dispatch(selectPort(i))}
                        disabled={selectedConnection < 0}
                    />
                </InputRow>
                <InputRow>
                    <PrimaryButton disabled={selectedPort < 0}>Open {portOptions[selectedPort]}</PrimaryButton>
                </InputRow>
            </CollapsibleSection>
            <CollapsibleSection title={'Data'} initialState={true}>
                THis is a section fsdf
            </CollapsibleSection>
        </div>
    );
};

export default TelemetryController;
