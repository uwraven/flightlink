import React, { useState } from 'react';
import styles from './TelemetryController.module.scss';
import { CollapsibleSubsection, CollapsibleSection } from 'Components/Collapsible/Collapsible';
import InputRow from 'Components/Presentation/InputRow/InputRow';
import DropdownSelect from 'Components/DropdownSelect/DropdownSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectConnection, selectProtocol, selectPort, openPort, closePort } from 'Redux/Record/Device/DeviceSlice';
import { PrimaryButton, DestructiveButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';
import Checkbox from 'Components/Checkbox/Checkbox';

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
                        disabled={openingPort}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <span>Protocol</span>
                    <DropdownSelect
                        options={protocolOptions}
                        selected={selectedProtocol}
                        onSelect={(i) => dispatch(selectProtocol(i))}
                        disabled={selectedConnection < 0 || openingPort}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <span>Port</span>
                    <DropdownSelect
                        options={portOptions}
                        selected={selectedPort}
                        onSelect={(i) => dispatch(selectPort(i))}
                        disabled={selectedConnection < 0 || openingPort}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    {!portOpen ? (
                        <PrimaryButton
                            disabled={selectedPort < 0 || openingPort}
                            loading={openingPort}
                            loadingMessage={'Opening...'}
                            onClick={() => dispatch(openPort(portOptions[selectedPort]))}>
                            {`Open ${portOptions[selectedPort] || ''}`}
                        </PrimaryButton>
                    ) : (
                        <DestructiveButton disabled={false} onClick={() => dispatch(closePort())}>
                            {`Close ${portOptions[selectedPort] || ''}`}
                        </DestructiveButton>
                    )}
                </InputRow>
            </CollapsibleSection>
            <CollapsibleSection title={'Data'} initialState={true}>
                <InputRow>
                    <span>Configuration</span>
                    <DropdownSelect
                        options={[ 'config' ]}
                        selected={0}
                        onSelect={() => {}}
                        disabled={false}
                        className={styles.dropdown}
                    />
                </InputRow>
                <InputRow>
                    <span>Folder</span>
                    {/* <TextInput/> */}
                </InputRow>
                <InputRow>
                    <span>3D Render</span>
                    <Checkbox on={true} onClick={() => {}} />
                </InputRow>
                <InputRow>
                    <span>Stream</span>
                    <Checkbox on={false} onClick={() => {}} />
                </InputRow>
            </CollapsibleSection>
        </Resizable>
    );
};

export default TelemetryController;
