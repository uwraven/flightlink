import React, {useState, useLayoutEffect} from 'react';
import styles from './SignalConfiguration.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalEditor from './SignalEditor/SignalEditor';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSignalId } from 'Store/Configure/SignalEditorSlice';
import LCTableView from 'Components/LCTableView/LCTableView';


let signalArray = new Array(100);
signalArray.fill(0);
signalArray = signalArray.map((signal, i) => `row: ${i}`)

const SignalConfiguration = ({configurationId, ...props}) => {

    const dispatch = useDispatch();
    const { selectedSignalId } = useSelector((state) => state.signalEditor);

    // move to Store
    const [ signals, setSignals ] = useState(signalArray);

    const onDragSuccess = (from, to) => {
        setSignals(prev => {
            const signalArr = [...prev];
            signalArr.splice(to, 0, signalArr.splice(from, 1));
            return signalArr;
        })
    }

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
                    />
                    <LCTableView
                        selectedId={selectedSignalId}
                        rows={signals}
                        onDragPropose={() => {}}
                        onDragSuccess={onDragSuccess}
                        row={(id, selected, dragging) => {
                            return (
                                <p>
                                    {id}
                                </p>
                            )
                        }}
                    />
                </Resizable>
                    { selectedSignalId ? <SignalEditor/> : <div className={styles.emptySignalContainer}>Select signal to edit</div> }
            </div>
        </div>
    )
};

export default SignalConfiguration