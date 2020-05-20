import React, {useState, useLayoutEffect} from 'react';
import styles from './SignalTable.module.scss';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalEditor from '../SignalEditor';
import { useSelector, useDispatch } from 'react-redux';
import LCTableView from 'Components/LCTable/LCTableView';
import SignalTableRow from '../SignalTableRow/SignalTableRow';
import { setSelectedSignalId } from 'Store/Interface/Editor/SignalEditor'
import { TextButton } from 'Components/Button/Button';
import { createSignal } from 'Store/Data/Workspace/Signals';

const SignalTable = ({...props}) => {

    const dispatch = useDispatch();
    const { selectedConfigurationId } = useSelector((state) => state.interface.editor.configurations);
    const signalIds = useSelector((state) => state.data.workspace.configurations.configurationEntities[selectedConfigurationId].signals);
    const { selectedSignalId } = useSelector((state) => state.interface.editor.signals);

    const onDragSuccess = (from, to) => {
        // dispatch(setSignalOrder({from: from, to: to}));
    }

    return(
        <div className={styles.container}>
            <div className={styles.body}>
                <Resizable 
                    right={true}
                    xmin={144}
                    xmax={344}
                    handle={4}
                    className={styles.tableContainer}
                >
                    <LCTableView
                        className={styles.table}
                        selectedId={selectedSignalId}
                        rows={signalIds}
                        onDragPropose={(id) => {
                            // console.log(id)
                        }}
                        onDragSuccess={onDragSuccess}
                        onRowSelect={(id) => dispatch(setSelectedSignalId(id))}
                        row={(id, index, selected, dragging) => {
                            return (
                                <SignalTableRow 
                                    id={id} 
                                    selected={selected} 
                                    dragging={dragging}
                                />
                            );
                        }}
                    />
                    <div className={styles.actionContainer}>
                        <TextButton onClick={() => dispatch(createSignal(selectedConfigurationId))}>Add Signal</TextButton>
                    </div>
                </Resizable>
            </div>
        </div>
    )
};

export default SignalTable