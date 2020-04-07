import React, { useState, useRef, useEffect } from 'react';

const Resizable = ({ className, children }) => {
    const div = useRef();

    const _target = useRef({
        x: 0,
        y: 0
    });

    const [ resizing, setResizing ] = useState(false);

    useEffect(() => {
        setSize({
            width: div.current.clientWidth,
            height: div.current.clientHeight
        });
    }, []);

    const [ size, setSize ] = useState({
        width: 0,
        height: 0
    });

    const [ target, setTarget ] = useState({
        x: 0,
        y: 0
    });

    const mouseDown = (e) => {
        console.log('down');
        _target.current = {
            x: e.pageX,
            y: e.pageY
        };
        setTarget(_target.current);
        setResizing(true);
    };

    const mouseUp = (e) => {
        setResizing(false);
        console.log('mouseUp');
        setSize({
            width: div.current.clientWidth,
            height: div.current.clientHeight
        });
    };

    const mouseMove = (e) => {
        if (resizing) {
            // Compute change in x from current target and down position
            let dx = e.pageX - target.x;
            let dy = e.pageY - target.y;
            // div.current.element.width = size.width + e.pageX;
            div.current.style.width = `${size.width + dx}px`;
            div.current.style.height = `${size.height + dy}px`;
        }
    };

    const mouseOut = () => {
        if (resizing) {
            setSize({
                width: div.current.clientWidth,
                height: div.current.clientWidth
            });
            setResizing(false);
        }
    };

    return (
        <div ref={div} className={className} onMouseDown={mouseDown} onMouseMoveCapture={mouseMove}>
            {children}
        </div>
    );
};

export default Resizable;
