import React, {useState, useLayoutEffect} from 'react';
import styles from './SignalConfiguration.module.scss';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalEditor from './SignalEditor/SignalEditor';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSignalId } from 'Store/Configure/ConfigureSlice';
import LCTableView from 'Components/LCTable/LCTableView';
import SignalTableRow from './SignalTableRow/SignalTableRow';

let signalArray = new Array(12);
signalArray.fill(0);
signalArray = signalArray.map((signal, i) => `${i}`)

const SignalConfiguration = ({configurationId, ...props}) => {

    const dispatch = useDispatch();
    const { selectedSignalId, signalArr } = useSelector((state) => state.configure);

    // move to Store
    const [ signals, setSignals ] = useState(signalArray);

    const onDragSuccess = (from, to) => {
        setSignals(prev => {
            let arr = [...prev];
            // console.log("ONDRAGSUCCESS", "prev", prev, from , to)
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            // console.log("ONDRAGSUCCESS", "arr", arr)
            return arr;
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
                    <LCTableView
                        className={styles.table}
                        selectedId={selectedSignalId}
                        rows={signals}
                        onDragPropose={(id) => {
                            // console.log(id)
                        }}
                        onDragSuccess={onDragSuccess}
                        onRowSelect={(id) => {
                            // console.log("ONROWSELECT", "selected row ID", id, `[${typeof id}]`)
                            dispatch(setSelectedSignalId(id))
                        }}
                        row={(id, index, selected, dragging) => {
                            const rowStyle = [
                                styles.row,
                                selected && styles.selectedRow,
                                dragging && styles.draggingRow
                            ].join(' ');
                            return (<SignalTableRow id={id} selected={selected} dragging={dragging}/>)
                        }}
                    />
                    <div className={styles.addSignalButton}>
                        <span>Add Signal</span>
                    </div>

                </Resizable>
                    { selectedSignalId ? <SignalEditor id={selectedSignalId}/> : <div className={styles.emptySignalContainer}>Select signal to edit</div> }
            </div>
        </div>
    )
};

export default SignalConfiguration