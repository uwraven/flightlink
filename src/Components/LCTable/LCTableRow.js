import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const LCTableRow = ({children, onMouseDown, onMouseMove, onMouseLeave, onMouseUp, ...props}) => {

    const ref = useRef(null);

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
            onMouseUp={(e) => {
                onMouseUp(e, ref);
            }}
            style={{
                transition: `padding 50ms, height 75ms`,
                overflow: `visible`,
            }}
            >
            {children}
        </div>
    )
};

export default LCTableRow;