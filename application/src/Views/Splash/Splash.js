import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Splash.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { APP } from '../../constants';
import { 
    loadWorkspaces, 
    setLoadingWorkspacesSuccess,
    setLoadingWorkspacesFailure,
    setWorkspaces
} from 'Store/Application/ApplicationSlice';
import { PrimaryButton, SecondaryButton, TextButton } from 'Components/Button/Button';
import Table, {TableRow, TableHeader} from 'Components/Table/Table';

const { ipcRenderer } = window.electron

const Splash = ({}) => {

    const dispatch = useDispatch();
    const { workspaces, selectedWorkspace } = useSelector((state) => state.application);
    const [creatingWorkspace, setCreatingWorkspace] = useState(false);

    useLayoutEffect(() => {
        const onLoadWorkspaces = (event, payload) => {
            dispatch(setLoadingWorkspacesSuccess())
            dispatch(setWorkspaces(Object.values(payload)))
        }
        dispatch(loadWorkspaces());
        ipcRenderer.on(APP.GET_WORKSPACES, onLoadWorkspaces);
        return () => {
            ipcRenderer.removeListener(APP.GET_WORKSPACES, onLoadWorkspaces)
        }
    }, [dispatch]);

    const createWorkspace = () => {
        setCreatingWorkspace(true);
        const onCreateWorkspace = (event, payload) => {
            ipcRenderer.removeAllListeners(APP.CREATE_WORKSPACE, onCreateWorkspace)
        }
        ipcRenderer.send(APP.CREATE_WORKSPACE)
        ipcRenderer.on(APP.CREATE_WORKSPACE, (event, success) => {
            console.log(success);
            if (!success) setCreatingWorkspace(false);
        })
    }

    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Flightlink</h1>
                    <h4 className={styles.version}>Alpha 0.1.0</h4>
                </div>
                <div className={styles.tableContainer}>
                    <TableHeader title={"Workspaces"}/>
                    <Table rows={["1"]} row={(id, index) => 
                        <TableRow>
                            <p>{workspaces[id]}</p>
                            <p>{}</p>
                        </TableRow>
                    }/>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <div className={styles.leftActions}>
                    <TextButton 
                        onClick={createWorkspace} 
                        loading={creatingWorkspace}
                        disabled={creatingWorkspace}
                        loadingMessage={"Creating Workspace..."}
                    >
                        Create New Workspace
                    </TextButton>
                </div>
                <div className={styles.rightActions}>
                    <SecondaryButton className={styles.button}>Cancel</SecondaryButton>
                    <PrimaryButton
                        className={styles.button}
                        disabled={!selectedWorkspace}
                    >Open</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Splash;