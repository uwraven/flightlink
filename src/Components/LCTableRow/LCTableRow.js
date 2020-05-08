import React, { useState, useEffect } from 'react';

const LCTableRow = ({children, ...props}) => {
    return(
        <div {...props}>
            {children}
        </div>
    )
};

export default LCTableRow;