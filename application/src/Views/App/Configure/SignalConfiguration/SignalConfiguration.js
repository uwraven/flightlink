import React, {useState, useLayoutEffect} from 'react';
import styles from './SignalConfiguration.module.scss';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalEditor from './SignalEditor/SignalEditor';
import { useSelector, useDispatch } from 'react-redux';
import LCTableView from 'Components/LCTable/LCTableView';
import SignalTableRow from './SignalTableRow/SignalTableRow';


// FIXME: Jesus
const selectedSignalId = "";
const signals = [];
const setSelectedSignalId = () => {};
const setSignalOrder = () => {}

const SignalConfiguration = ({configurationId, ...props}) => {

    const dispatch = useDispatch();
    // const { selectedSignalId, signals } = useSelector((state) => state.configure);

    const onDragSuccess = (from, to) => {
        dispatch(setSignalOrder({from: from, to: to}));
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
                            return (<SignalTableRow id={id} selected={selected} dragging={dragging}/>)
                        }}
                    />
                    <div className={styles.addSignalButton}>
                        <span>Add Signal</span>
                    </div>

                </Resizable>
                    { selectedSignalId ? 
                        <SignalEditor id={selectedSignalId}/> : 
                        <div className={styles.emptySignalContainer}>Select signal to edit</div> 
                    }
            </div>
        </div>
    )
};

export default SignalConfiguration