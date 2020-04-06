import React, { useEffect, useState, useRef } from 'react';

const Dropdown = (props) => {
    let container = useRef();

    const [ open, setOpen ] = useState(false);

    useEffect(
        () => {
            let closeFunc = (e) => {
                if (!container.current.contains(e.target) && open) setOpen(false);
            };
            window.addEventListener('mousedown', closeFunc);
            return () => window.removeEventListener('mousedown', closeFunc);
        },
        [ open, container ]
    );

    return (
        <div className={props.className} ref={container}>
            {props.currentRender(open, setOpen)}
            {props.dropdownRender(open, setOpen)}
        </div>
    );
};

export default Dropdown;
