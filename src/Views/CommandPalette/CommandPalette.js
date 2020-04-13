import React from 'react';
import Resizable from './../../Components/Core/Resizable/Resizable';
import styles from './CommandPalette.module.scss';
import { connect } from 'react-redux';

const CommandPalette = ({ setHeight, ...props }) => {
    return (
        <Resizable className={styles.container} top={true} ymax={window.innerHeight} ymin={0} onCollapse={() => {}}>
            <div>Child</div>
        </Resizable>
    );
};
export default CommandPalette;
