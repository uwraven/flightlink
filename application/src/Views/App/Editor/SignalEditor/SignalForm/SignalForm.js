import React, { useState, useEffect } from 'react';
import styles from './SignalForm.module.scss';
import TextInput from 'Components/Inputs/TextInput/TextInput';
import Input from 'Components/Inputs/Input/Input';
import Checkbox from 'Components/Inputs/Checkbox/Checkbox';
import DropdownSelect from 'Components/Inputs/DropdownSelect/DropdownSelect';
import NumInput from 'Components/Inputs/NumInput/NumInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateSignalField, saveSignal } from 'Store/Data/Workspace/Signals';

const SignalForm = ({...props}) => {

    const dispatch = useDispatch();

    const { selectedSignalId } = useSelector(state => state.interface.editor.signals);
    const signal = useSelector(state => state.data.workspace.signals.signalEntities[selectedSignalId]);

    const [localSignal, setLocalSignal] = useState(signal);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        setLocalSignal(signal);
        return(() => {
            if (edited) dispatch(saveSignal(selectedSignalId))
        })
    }, [selectedSignalId])

    const onFieldChange = (field, value) => {
        console.log(field, value);
        setLocalSignal(state => {
            console.log("setEdited")
            return({
                ...state,
                [field]: value
            })
        })
    }

    const onFieldSubmit = (field, value) => {
        setEdited(true);
        onFieldChange(field, value);
        dispatch(updateSignalField({
            signalId: selectedSignalId, 
            field: field, 
            value: value
        }))
    }

    return(
        <div className={styles.container}>
            <Input title={"Name"} hint={"Set the signal name"}>
                <TextInput
                    value={localSignal.name}
                    valid={true}
                    disabled={false}
                    placeholder={"Signal name"}
                    onChange={(value) => onFieldChange('name', value)}
                    onSubmit={(value) => onFieldSubmit('name', value)}
                />
            </Input>
            <Input title={"Units"} hint={"Set display units"}>
                <TextInput
                    value={localSignal.units}
                    valid={true}
                    disabled={false}
                    placeholder={"Units"}
                    onChange={(value) => onFieldChange('units', value)}
                    onSubmit={(value) => onFieldSubmit('units', value)}
                />
            </Input>
            <Input title={"3D Render"} hint={"Enable 3D rendering of this signal"} short={true}>
                <Checkbox
                    on={localSignal.render}
                    onClick={() => onFieldSubmit('render', !localSignal.render)}
                    disabled={false}
                />
            </Input>
            <Input title={"Stream"} hint={"Enable real time stream plotting of this signal"} short={true}>
                <Checkbox
                    on={localSignal.stream}
                    onClick={() => onFieldSubmit('stream', !localSignal.stream)}
                    disabled={false}
                />
            </Input>
            <Input title={"Signal Mode"} hint={"Select 3D renderering method"}>
                <DropdownSelect
                    options={["To do"]}
                    selected={-1}
                    placeholder={"Select signal mode"}
                    onSelect={() => {}}
                    disabled={false}
                    className={styles.dropdown}
                />
            </Input>
            <Input title={"Buffer Index"} hint={"Starting index of signal in the data buffer"}>
                <NumInput
                    value={localSignal.bufferIndex}
                    disabled={false}
                    int={true}
                    valid={true}
                    onChange={(value) => onFieldChange('bufferIndex', value)}
                    onSubmit={(value) => onFieldSubmit('bufferIndex', value)}
                />
            </Input>
            <Input title={"Data Length"} hint={"Set the length of the signal vector"}>
                <NumInput
                    value={localSignal.length}
                    disabled={false}
                    valid={true}
                    int={true}
                    onChange={(value) => onFieldChange('length', value)}
                    onSubmit={(value) => onFieldSubmit('length', value)}
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

export default SignalForm