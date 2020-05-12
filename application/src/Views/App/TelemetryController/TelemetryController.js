import React, { useState } from 'react';
import styles from './TelemetryController.module.scss';
import { CollapsibleSubsection, CollapsibleSection } from 'Components/Collapsible/Collapsible';
import InputRow from 'Components/Presentation/InputRow/InputRow';
import DropdownSelect from 'Components/Inputs/DropdownSelect/DropdownSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectConnection, selectProtocol, selectPort, openPort, closePort } from 'Store/Record/Device/DeviceSlice';
import { setRenderOpen, setStreamOpen } from 'Store/Interface/InterfaceSlice';
import { PrimaryButton, DestructiveButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';
import Toggle from 'Components/Toggle/Toggle';

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

    const { renderOpen, streamOpen } = useSelector((state) => state.interface);

    const { configurationOptions, selectedConfigurationOption } = useSelector((state) => state.signal);

    return (
        <Resizable right={true} handle={4} xmin={192} xmax={512} className={styles.container}>
            <CollapsibleSection title={'Connect Device'} initialState={true} header={true} footer={true}>
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
            <CollapsibleSection title={'Data'} initialState={true} header={true} footer={false}>
                <InputRow>
                    <span>Configuration</span>
                    <DropdownSelect
                        options={configurationOptions}
                        selected={selectedConfigurationOption}
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
                    <Toggle on={renderOpen} onClick={() => dispatch(setRenderOpen(!renderOpen))} />
                </InputRow>
                <InputRow>
                    <span>Stream</span>
                    <Toggle on={streamOpen} onClick={() => dispatch(setStreamOpen(!streamOpen))} />
                </InputRow>
                <CollapsibleSubsection title={'Signals'} initialState={true} header={true} footer={true}>
                    <InputRow>
                        <span>help</span>
                    </InputRow>
                </CollapsibleSubsection>
            </CollapsibleSection>
        </Resizable>
    );
};

export default TelemetryController;
