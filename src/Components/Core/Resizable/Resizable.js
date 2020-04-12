import React, { useState, useRef, useEffect, useReducer } from 'react';

const Resizable = ({
    className,
    x = false,
    y = false,
    xmin = 0,
    xmax = window.innerWidth,
    ymin = 0,
    ymax = window.innerHeight,
    top = false,
    bottom = false,
    right = false,
    left = false,
    handle = 4,
    collapseThreshold = 4,
    onCollapse,
    ...props
}) => {
    const div = useRef();

    const _target = useRef({
        x: 0,
        y: 0
    });

    const _resizing = useRef({
        x: false,
        y: false
    });

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

    const getDirection = (p, frame, margin) => {
        let top = p.y - frame.top < margin;
        let right = frame.left - p.x + frame.width < margin;
        let bottom = frame.top + frame.height - p.y < margin;
        let left = p.x - frame.left < margin;

        // if (top && left) directions.push('nw');
        // if (top) directions.push('n');
        // if (top && right) directions.push('ne');
        // if (right) directions.push('e');
        // if (right && bottom) directions.push('se');
        // if (bottom) directions.push('s');
        // if (bottom && left) directions.push('sw');
        // if (left) directions.push('w');

        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
    };

    const mouseMove = (e) => {
        if (_resizing.current.x && (left || right || x)) {
            let dx = e.pageX - _target.current.x;
            let width = Math.min(Math.max(size.width + dx, xmin), xmax);
            if (width < collapseThreshold) div.current.style.width = `${width}px`;
        }
        if (_resizing.current.y && (top || bottom || y)) {
            let dy = _target.current.y - e.pageY;
            let height = Math.min(Math.max(size.height + dy, ymin), ymax);
            div.current.style.height = `${height}px`;

            if (height < collapseThreshold && ((top && dy < 0) || (bottom && dy > 0))) {
                try {
                    onCollapse(size);
                } catch (err) {
                    console.log('error');
                }
                _resizing.current.y = false;
            }
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

        _resizing.current = {
            x: false,
            y: false
        };
    };

    const mouseDown = (e) => {
        const rect = div.current.getBoundingClientRect();
        const p = { x: e.clientX, y: e.clientY };

        let direction = getDirection(p, rect, handle);

        if ((direction.right && right) || x) {
            _target.current.x = e.pageX;
            _resizing.current.x = true;
        }

        if ((direction.top && top) || y) {
            _target.current.y = e.pageY;
            _resizing.current.y = true;
        }

        if (direction.top || direction.right || direction.bottom || direction.left) {
            console.log('resize pleaseeeee');
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }
    };

    const mouseHover = (e) => {
        const rect = div.current.getBoundingClientRect();
        const p = { x: e.clientX, y: e.clientY };
        let direction = getDirection(p, rect, handle);
        if ((direction.top && top) || (direction.bottom && bottom) || y) {
            if (document.body.style.cursor !== 'row-resize') document.body.style.cursor = 'row-resize';
        } else if ((direction.right && right) || (direction.left && left) || x) {
            if (document.body.style.cursor !== 'col-resize') document.body.style.cursor = 'col-resize';
        } else {
            if (!_resizing.current.x && !_resizing.current.y) {
                if (document.body.style.cursor !== 'default') document.body.style.cursor = 'default';
            }
        }
    };

    const resetCursor = () => {
        if (!_resizing.current.x && !_resizing.current.y) {
            document.body.style.cursor = 'default';
        }
    };

    return (
        <div ref={div} className={className} onMouseDown={mouseDown} onMouseMove={mouseHover} onMouseOut={resetCursor}>
            {props.children}
        </div>
    );
};

export default Resizable;
