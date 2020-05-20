import React from 'react';
import {useSelector} from 'react-redux';
import styles from './SignalTableRow.module.scss';

const SignalTableRow = ({id, selected, dragging, ...props}) => {

    const signal = useSelector((state) => state.data.workspace.signals.signalEntities[id])

    const rowStyle = [
        styles.row,
        selected && styles.selectedRow,
        dragging && styles.draggingRow
    ].join(' ');

    return(
        <div className={rowStyle}>
            <p className={styles.indicesLabel}>
                {`${signal.bufferIndex}-${signal.bufferIndex + signal.length - 1}`}
            </p>
            <p className={styles.name}>
                {signal.name}
            </p>
        </div>
    )
}

export default SignalTableRow;