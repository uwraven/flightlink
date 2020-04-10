import React from 'react';
import Resizable from './../../Components/Core/Resizable/Resizable';
import styles from './CommandPalette.module.scss';
import { connect } from 'react-redux';
import { setCommandPaletteHeight, setCommandPaletteVisibility } from './../../Redux/Interface/actions';

const CommandPalette = ({ setHeight, ...props }) => {
    return (
        <Resizable className={styles.container} top={true} ymax={window.innerHeight} ymin={0} onCollapse={() => {}}>
            <div>Child</div>
        </Resizable>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    const closePalette = () => {
        dispatch(setCommandPaletteVisibility(false));
    };
    return {
        closePalette
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandPalette);
