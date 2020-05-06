import React, { useState } from 'react';
import styles from './SignalEditor.module.scss';
import TextInput from 'Components/Inputs/TextInput/TextInput';
import Input from 'Components/Inputs/Input/Input';
import Checkbox from 'Components/Inputs/Checkbox/Checkbox';
import DropdownSelect from 'Components/Inputs/DropdownSelect/DropdownSelect';
import NumInput from 'Components/Inputs/NumInput/NumInput';

const SignalEditor = ({signalId, ...props}) => {

// Redux hooks to get and set signal properties based on id

    return(
        <div className={styles.container}>
            <Input title={"Name"} hint={"Set the signal name"}>
                <TextInput
                    valid={true}
                    disabled={false}
                    placeholder={"Signal name"}
                    onSubmit={() => {}}
                />
            </Input>
            <Input title={"Units"} hint={"Set display units"}>
                <TextInput
                    valid={true}
                    disabled={false}
                    placeholder={"Units"}
                    onSubmit={() => {}}
                />
            </Input>
            <Input title={"3D Render"} hint={"Enable 3D rendering of this signal"} short={true}>
                <Checkbox
                    on={false}
                    onClick={() => {}}
                    disabled={false}
                />
            </Input>
            <Input title={"Stream"} hint={"Enable real time stream plotting of this signal"} short={true}>
                <Checkbox
                    on={false}
                    onClick={() => {}}
                    disabled={false}
                />
            </Input>
            <Input title={"Signal Mode"} hint={"Select 3D renderering method"}>
                <DropdownSelect
                    options={[]}
                    selected={-1}
                    placeholder={"Select signal mode"}
                    onSelect={() => {}}
                    disabled={false}
                    className={styles.dropdown}
                />
            </Input>
            <Input title={"Buffer Index"} hint={"Starting index of signal in the data buffer"}>
                <NumInput
                    disabled={false}
                    int={true}
                    valid={true}
                    onSubmit={() => {}}
                />
            </Input>
            <Input title={"Data Length"} hint={"Set the length of the signal vector"}>
                <NumInput
                    disabled={false}
                    valid={true}
                    int={true}
                    onSubmit={() => {}}
                />
            </Input>
            <Input title={"Rendered Model"} hint={"Select the object mesh to render"}>
                <DropdownSelect
                    options={[]}
                    selected={-1}
                    placeholder={"Select signal mode"}
                    onSelect={() => {}}
                    disabled={false}
                    className={styles.dropdown}
                />
            </Input>

            <Input title={"Parent"} hint={"The signal will be rendered according the parent signal transform"}>
                <DropdownSelect
                    options={[]}
                    selected={-1}
                    placeholder={"Select parent"}
                    onSelect={() => {}}
                    disabled={false}
                    className={styles.dropdown}
                />
            </Input>

        </div>
    )
};

export default SignalEditor