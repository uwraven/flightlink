import React, { useState, useRef, useEffect } from 'react';

const Resizable = ({ className, children, ...props }) => {
    const div = useRef();

    const _target = useRef({
        x: 0,
        y: 0
    });

    const _resizing = useRef(false);

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

    const mouseMove = (e) => {
        if (_resizing.current) {
            let dx = e.pageX - _target.current.x;
            let dy = e.pageY - _target.current.y;

            let width = Math.min(Math.max(size.width + dx, props.xmin || 0), props.xmax || window.innerWidth);
            let height = Math.min(Math.max(size.height + dy, props.ymin || 0), props.ymax);

            if (props.x !== false) div.current.style.width = `${width}px`;
            if (props.y !== false) div.current.style.height = `${height}px`;
        }
    };

    const mouseUp = (e) => {
        setSize({
            width: div.current.clientWidth,
            height: div.current.clientHeight
        });
        document.removeEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        document.body.style.cursor = 'default';

        _resizing.current = false;
    };

    const mouseDown = (e) => {
        const rect = div.current.getBoundingClientRect();

        let proximityRight = rect.width - (e.clientX - rect.left);

        let engageRight = proximityRight < (props.handleRight || 8);

        if (engageRight) {
            _resizing.current = true;
            _target.current = {
                x: e.pageX,
                y: e.pageY
            };
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);

            document.body.style.cursor = 'ew-resize';
        }
    };

    return (
        <div ref={div} className={className} onMouseDown={mouseDown}>
            {children}
        </div>
    );
};

export default Resizable;
