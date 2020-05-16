import React, { Component } from 'react';
import styles from './ApplicationHeader.module.scss';
import TabBar from 'Components/TabBar/TabBar';
import { IconButton } from 'Components/Button/Button';
import { ReactComponent as UplinkIcon } from 'Assets/Icons/uplink.svg';
import { ReactComponent as PaletteIcon } from 'Assets/Icons/palette.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from 'Store/InterfaceSlice';
import { setCommandPaletteOpen } from 'Store/InterfaceSlice';

const ApplicationHeader = ({ ...props }) => {
    const dispatch = useDispatch();

    const { selectedTab, consoleOpen, commandPaletteOpen } = useSelector((state) => state.interface);
    const { name } = useSelector((state) => state.workspace.name);

    return (
        <TabBar
            options={[ 'Record', 'Configure' ]}
            selected={selectedTab}
            onClick={(i) => dispatch(setSelectedTab(i))}
            className={styles.container}>
            <div className={styles.titleBox}>
            <div className={styles.title}>{name}</div>
            </div>
            <div className={styles.inner}>
                <IconButton
                    on={commandPaletteOpen}
                    onClick={() => dispatch(setCommandPaletteOpen(!commandPaletteOpen))}>
                    <PaletteIcon />
                </IconButton>
                <IconButton on={consoleOpen} onClick={() => {}}>
                    <UplinkIcon />
                </IconButton>
            </div>
        </TabBar>
    );
};

export default ApplicationHeader;
