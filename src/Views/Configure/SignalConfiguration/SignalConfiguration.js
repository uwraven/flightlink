import React, {useState} from 'react';
import styles from './SignalConfiguration.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalEditor from './SignalEditor/SignalEditor';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSignalId } from 'Redux/Configure/SignalEditorSlice';

const SignalConfiguration = ({configurationId, ...props}) => {

    const dispatch = useDispatch();
    const { selectedSignalId } = useSelector((state) => state.signalEditor);

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                {/* configuration name editor */}
            </div>
            <div className={styles.body}>
                <Resizable 
                    right={true} 
                    xmin={144} 
                    xmax={344} 
                    handle={4} 
                    className={styles.tableContainer}
                >
                    <Table
                        rows={["1", "2"]}
                        row={(key) => {
                            const selected = key === selectedSignalId;
                            return <TableRow
                                className={[styles.tableRow, selected && styles.selectedRow].join(" ")}
                                selected={selected} 
                                onClick={() => dispatch(setSelectedSignalId(key))}>
                                <span className={styles.minorLabel}>{key}</span>
                                <span className={styles.majorLabel}>{key}</span>
                            </TableRow>
                        }}
                    >
                    </Table>
                </Resizable>
                    { selectedSignalId ? <SignalEditor/> : <div className={styles.emptySignalContainer}>Select signal to edit</div> }
            </div>
        </div>
    )
};

export default SignalConfiguration