import React from 'react';
import Resizable from './../../Components/Core/Resizable/Resizable';
import styles from './CommandPalette.module.scss';
import { setCommandPaletteOpen } from 'Redux/Interface/InterfaceSlice';
import { connect, useDispatch } from 'react-redux';
import Checkbox from 'Components/Checkbox/Checkbox';

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
