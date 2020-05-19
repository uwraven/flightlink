import React from 'react';
import Resizable from '../../../Components/Core/Resizable/Resizable';
import styles from './CommandPalette.module.scss';
import { setCommandPaletteOpen } from 'Store/Interface/Interface';
import { connect, useDispatch } from 'react-redux';

const CommandPalette = ({ setHeight, ...props }) => {
    const dispatch = useDispatch();
    return (
        <Resizable
            className={styles.container}
            top={true}
            ymax={window.innerHeight}
            ymin={0}
            onCollapse={() => {
                dispatch(setCommandPaletteOpen(false));
            }}>
            <div>CommandPalette</div>
        </Resizable>
    );
};
export default CommandPalette;
