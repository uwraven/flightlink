import React from 'react';
import {useSelector} from 'react-redux';
import styles from './SignalTableRow.module.scss';

const SignalTableRow = ({signalId, selected, dragging, ...props}) => {

    const signal = useSelector(state => state.configure.signals[signalId]) || 
    {initialIndex: 0, length: 3, name: "signal"};
    
    const rowStyle = [
        styles.row,
        selected && styles.selectedRow,
        dragging && styles.draggingRow
    ].join(' ');

    return(
        <div className={rowStyle}>
            <p className={styles.indicesLabel}>{`${signal.initialIndex}-${signal.initialIndex + signal.length}`}</p>
            <p className={styles.name}>{signal.name}</p>
        </div>
    )
}

export default SignalTableRow;