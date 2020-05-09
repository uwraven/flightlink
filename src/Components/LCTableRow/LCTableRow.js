import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const LCTableRow = ({children, onMouseDown, onMouseMove, onMouseLeave, ...props}) => {

    const ref = useRef(null);

    useEffect(() => {
        const row = ref.current;
        row.style.height = `${row.clientHeight}px`
    }, [children])

    return(
        <div
            ref={ref} {...props} 
            onMouseDown={(e) => {
                onMouseDown(e, ref);
            }}
            onMouseMove={(e) => {
                onMouseMove(e, ref);
            }}
            onMouseLeave={(e) => {
                onMouseLeave(e, ref);
            }}
            style={{
                transition: `height 200ms, padding-top 100ms`,
                overflow: `visible`,
                backgroundColor: `red`,
            }}
            >
            {children}
        </div>
    )
};

export default LCTableRow;