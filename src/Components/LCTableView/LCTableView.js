import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import LCTableRow from 'Components/LCTableRow/LCTableRow';

const LCTableView = ({
    rows, 
    row, 
    selectedId, 
    setSelectedId, 
    draggable, 
    onDragSuccess, 
    onDragFailure,
    onDragPropose,
    className,
    ...props
}) => {

    const [ draggingId, setDraggingId ] = useState(null);
    const screenTarget = useRef({x: 0, y: 0});
    const containerRef = useRef(null);
    const draggingRef = useRef(null);
    const targetRowIndex = useRef(-1);

    const onMouseDown = (event, id, ref, initialIndex) => {

        let dy;
        let row = ref.current;
        let currentRowHeight = ref.current.clientHeight;

        screenTarget.current = {
            x: event.screenX,
            y: event.screenY
        }
        draggingRef.current = ref;
        setDraggingId(id);

        const onGlobalMouseMove = (e) => {
            dy = e.screenY - screenTarget.current.y;
            row.style.transform = `translateY(${dy}px)`;
            row.style.pointerEvents = `none`;
        }

        const onMouseUp = (e) => {
            window.removeEventListener("mousemove", onGlobalMouseMove)
            window.removeEventListener("mouseup", onMouseUp)
            row.style.transform = `none`;
            row.style.pointerEvents = `all`;
            draggingRef.current = null;
            onDragSuccess(initialIndex, targetRowIndex.current);
        }

        window.addEventListener("mousemove", onGlobalMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    const onRowMouseMove = (event, id, ref, index) => {
        if (draggingRef.current) {
            let row = ref.current;
            const rect = row.getBoundingClientRect();
            let progress = (event.clientY - Math.round(rect.top)) / rect.height;
            if (progress > 0.5 && index !== targetRowIndex.current) {
                onDragPropose(index);
                targetRowIndex.current = index;
            } else if (progress < 0.5 && index === 0 && targetRowIndex.current !== 0) {
                onDragPropose(index);
                targetRowIndex.current = index;
            }
        }
    }

    const onRowMouseLeave = (event, id, ref, index) => {
        const row = ref.current;
    }

    useEffect(() => {
        
    }, rows);

    return(
        <div ref={containerRef} className={className}>
            {
                rows.map((id, index) => {
                    const selected = id === selectedId;
                    const dragging = id === draggingId;
                    return (
                        <LCTableRow 
                            onMouseDown={(e, ref) => onMouseDown(e, id, ref, index)}
                            onMouseMove={(e, ref) => onRowMouseMove(e, id, ref, index)}
                            onMouseLeave={(e, ref) => onRowMouseLeave(e, id, ref, index)}
                        >
                            { row(id, selected, dragging) }
                        </LCTableRow>
                    )
                })
            }
        </div>
    )
}

export default LCTableView;