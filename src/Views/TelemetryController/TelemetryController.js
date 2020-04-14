import React, { useState } from 'react';
import styles from './TelemetryController.module.scss';
import { CollapsibleSubsection, CollapsibleSection } from 'Components/Collapsible/Collapsible';
import InputRow from 'Components/Presentation/InputRow/InputRow';
import DropdownSelect from 'Components/DropdownSelect/DropdownSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectConnection, selectProtocol, selectPort, openPort } from 'Redux/Record/Device/DeviceSlice';
import { PrimaryButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';

const TelemetryController = (...props) => {
    const dispatch = useDispatch();
    const {
        connectionOptions,
        protocolOptions,
        portOptions,
        selectedConnection,
        selectedProtocol,
        selectedPort,
        portOpen,
        openingPort,
        portError
    } = useSelector((state) => state.device);

    return (
        <Resizable right={true} handle={4} xmin={192} xmax={512} className={styles.container}>
            <CollapsibleSection title={'Connect Device'} initialState={true}>
                <InputRow>
                    <span>Connection</span>
                    <DropdownSelect
                        options={connectionOptions}
                        selected={selectedConnection}
                        onSelect={(i) => dispatch(selectConnection(i))}
                        disabled={false}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <span>Protocol</span>
                    <DropdownSelect
                        options={protocolOptions}
                        selected={selectedProtocol}
                        onSelect={(i) => dispatch(selectProtocol(i))}
                        disabled={selectedConnection < 0}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <span>Port</span>
                    <DropdownSelect
                        options={portOptions}
                        selected={selectedPort}
                        onSelect={(i) => dispatch(selectPort(i))}
                        disabled={selectedConnection < 0}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <PrimaryButton
                        disabled={selectedPort < 0}
                        loading={openingPort}
                        onClick={() => dispatch(openPort(portOptions[selectedPort]))}>
                        {`Open ${portOptions[selectedPort] || ''}`}
                    </PrimaryButton>
                </InputRow>
            </CollapsibleSection>
            <CollapsibleSection title={'Data'} initialState={true}>
                {portOpen && 'open'}
                {openingPort && 'opening'}
                {portError}
            </CollapsibleSection>
        </Resizable>
    );
};

export default TelemetryController;
