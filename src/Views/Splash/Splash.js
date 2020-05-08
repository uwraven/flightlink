import React, { useEffect, useLayoutEffect } from 'react';
import styles from './Splash.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { application } from '../../constants';
import { 
    loadWorkspaces, 
    setLoadingWorkspacesSuccess,
    setLoadingWorkspacesFailure,
    setWorkspaces
} from 'Store/Application/ApplicationSlice';
import { PrimaryButton, SecondaryButton } from 'Components/Button/Button';

const { ipcRenderer } = window.require('electron');

const Splash = ({}) => {

    const dispatch = useDispatch();
    const { workspaces, selectedWorkspace } = useSelector((state) => state.application);

    useLayoutEffect(() => {
        const onLoadWorkspaces = (event, payload) => {
            dispatch(setLoadingWorkspacesSuccess())
            dispatch(setWorkspaces(Object.values(payload)))
        }
        dispatch(loadWorkspaces());
        ipcRenderer.on(application.channels.getWorkspaces, onLoadWorkspaces);
        return () => {
            ipcRenderer.removeListener(application.channels.getWorkspace, onLoadWorkspaces)
        }
    }, [dispatch]);

    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Flightlink</h1>
                    <h4 className={styles.version}>Alpha 0.1.0</h4>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <SecondaryButton>Cancel</SecondaryButton>
                <PrimaryButton
                    disabled={!selectedWorkspace}
                >Open</PrimaryButton>
            </div>
        </div>
    )
}

export default Splash;