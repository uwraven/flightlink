import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Plot = (props) => {

    const canvas = useRef(null);

    useEffect(() => {
        const context = canvas.current;
    })

    return(
        <div>
            <canvas
                ref={canvas}
            />
        </div>
    )
}

Plot.propTypes = {

}

export default Plot;