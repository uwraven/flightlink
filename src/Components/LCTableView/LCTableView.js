import React, { useState, useEffect } from 'react';
import LCTableRow from 'Components/LCTableRow/LCTableRow';

const LCTableView = ({rows, row, selectedId, setSelectedId, draggable, onDragSuccess, ...props}) => {

    const [ draggingId, setDraggingId ] = useState(null);

    useEffect(() => {
        
    }, [])

    return(
        <div>
            {
                rows.map((id, index) => {
                    const selected = id === selectedId;
                    const dragging = false;
                    return (
                        <LCTableRow 
                            onMouseDown={() => {console.log("mousedown")}}
                            mouseDown={() => {console.log("mousedown")}}
                        >
                            { row(id, index) }
                        </LCTableRow>
                    )
                })
            }
        </div>
    )
}

export default LCTableView;