import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import LCTableRow from 'Components/LCTable/LCTableRow';

const LCTableView = ({
    rows, 
    row, 
    selectedId, 
    setSelectedId, 
    draggable, 
    onRowSelect = () => {},
    onDragSuccess = () => {}, 
    onDragFailure = () => {},
    onDragPropose = () => {},
    className,
    ...props
}) => {

    const [ draggingId, setDraggingId ] = useState("");
    const screenTarget = useRef({x: 0, y: 0});
    const containerRef = useRef(null);
    const draggingRef = useRef(null);
    const draggingRowHeight = useRef(null);
    const draggingIdRef = useRef(null);
    const targetRowIndex = useRef(-1);

    const onMouseDown = (event, id, ref, initialIndex) => {

        // TODO
        // This entire implementation should be moved away from raw DOM manipulation and 
        // utilize custom hooks + css instead

        let dy;
        let row = ref.current;
        let currentRowHeight = row.clientHeight;

        screenTarget.current = {
            x: event.screenX,
            y: event.screenY
        }
        dy = screenTarget.current.y - row.getBoundingClientRect().top;
        draggingIdRef.current = id;
        draggingRef.current = row;
        draggingRowHeight.current = row.clientHeight;

        // console.log("ONMOUSEDOWN", "dragging ID:", id, `[${typeof id}]`);

        let validDragAction = false;

        const onGlobalMouseMove = (e) => {
            // dy = e.screenY - screenTarget.current.y - draggingRowOffset.current;
            
            row.style.top = `${e.screenY - dy}px`;
            if (!validDragAction) {
                // Drag has not started yet
                row.style.width = `${row.clientWidth}px`;
                row.style.position = `absolute`;
                row.style.zIndex = `1`;
                row.style.pointerEvents = `none`;
                setDraggingId(draggingIdRef.current);
            }
            validDragAction = true;

            // console.log("ONMOUSEMOVE", "dragging ID: ", id, `[${typeof id}]`)
        }

        const onMouseUp = (e) => {
            window.removeEventListener("mousemove", onGlobalMouseMove)
            window.removeEventListener("mouseup", onMouseUp)
            row.style.transform = `none`;
            row.style.position = `inherit`;
            row.style.pointerEvents = `all`;
            row.style.top = `0px`;
            row.style.height = `${currentRowHeight}px`;
            row.style.width = `inherit`;
            // console.log("ONMOUSEUP", "selected row ID: ", id, `[${typeof id}]`)
            if (validDragAction) {
                // Drag was performed
                onDragSuccess(initialIndex, targetRowIndex.current);
            } else {
                // Only a click event
                onRowSelect(id);
            }
            setDraggingId("");
            draggingRef.current = null;
            draggingRowHeight.current = null;
            targetRowIndex.current = -1;
        }

        window.addEventListener("mousemove", onGlobalMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    const onRowMouseMove = (event, id, ref, index) => {
        if (draggingRef.current) {
            draggingRef.current.style.height = `0px`;
            let row = ref.current;
            const draggingIndex = rows.indexOf(draggingId);
            const rect = row.getBoundingClientRect();
            let progress = (event.clientY - Math.round(row.offsetTop)) / rect.height;

            let proposedIndex;

            if (progress >= 0.5) {
                // If the row being drag follows this row, then it remains at
                // its original index
                const leadingIndex = index + 1;
                if (draggingIndex === leadingIndex || index === 0) {
                    proposedIndex = leadingIndex;
                } else if (draggingIndex > index) {
                    proposedIndex = leadingIndex;
                } else {
                    proposedIndex = index;
                }
                row.style.paddingTop = `0px`;
                row.style.paddingBottom = `${draggingRowHeight.current}px`;
            }

            // If not halfway over this row
            else {
                // If the row being dragged precedes the hovered row, then it remains at
                // its original index
                const precedingIndex = index - 1;
                if (draggingIndex === precedingIndex && index !== 0) {
                    // If the preceding row is not already the target destination
                    proposedIndex = precedingIndex;

                } else if (draggingIndex < index && index !== 0) {
                    proposedIndex = precedingIndex;
                } else {
                    proposedIndex = index;
                }
                row.style.paddingTop = `${draggingRowHeight.current}px`;
                row.style.paddingBottom = `0px`;
            }

            if (proposedIndex !== targetRowIndex.current) {
                draggingRef.current.style.height = `0px`;
                targetRowIndex.current = proposedIndex;
                onDragPropose(proposedIndex);
            }
        }
    }

    const onRowMouseLeave = (event, id, ref, index) => {
        const row = ref.current;
        row.style.paddingTop = `0px`;
        row.style.paddingBottom = `0px`;
    }

    const onRowMouseUp = (event, id, ref, index) => {
        const row = ref.current;
        row.style.paddingTop = `0px`;
        row.style.paddingBottom = `0px`;
    }

    return(
        <div ref={containerRef} className={className}>
            {
                rows.map((id, index) => {
                    const selected = id === selectedId;
                    const dragging = id === draggingId;
                    return (
                        <LCTableRow 
                            key={id}
                            onMouseDown={(e, ref) => onMouseDown(e, id, ref, index)}
                            onMouseMove={(e, ref) => onRowMouseMove(e, id, ref, index)}
                            onMouseLeave={(e, ref) => onRowMouseLeave(e, id, ref, index)}
                            onMouseUp={(e, ref) => onRowMouseUp(e, id, ref, index)}
                        >
                            { row(id, index, selected, dragging) }
                        </LCTableRow>
                    )
                })
            }
        </div>
    )
}

export default LCTableView;