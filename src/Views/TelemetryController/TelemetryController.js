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
            <CollapsibleSection title={'Device'} initialState={true}>
                <InputRow>
                    <span>Connection</span>
                    <DropdownSelect
                        options={connectionOptions}
                        selected={selectedConnection}
                        onSelect={selectConnection}
                        disabled={false}
                    />
                </InputRow>
                <InputRow>
                    <span>Protocol</span>
                    <DropdownSelect
                        options={protocolOptions}
                        selected={selectedProtocol}
                        onSelect={selectProtocol}
                        disabled={false}
                    />
                </InputRow>
                <InputRow>
                    <span>Port</span>
                    <DropdownSelect
                        options={portOptions}
                        selected={selectedPort}
                        onSelect={selectPort}
                        disabled={false}
                    />
                </InputRow>
                <InputRow>
                    <PrimaryButton disabled={false}>Open {portOptions[selectedPort]}</PrimaryButton>
                </InputRow>
            </CollapsibleSection>
            <CollapsibleSection title={'Data'} initialState={true} />
        </div>
    );
};

export default TelemetryController;
