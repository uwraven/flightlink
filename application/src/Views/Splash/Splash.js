import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Splash.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { 
    loadWorkspaces, 
    setLoadingWorkspacesSuccess,
    setLoadingWorkspacesFailure,
    createWorkspace,
    setSelectedWorkspace,
    openSelectedWorkspace
} from 'Store/Application/ApplicationSlice';
import { PrimaryButton, SecondaryButton, TextButton } from 'Components/Button/Button';
import Table, {TableRow, TableHeader} from 'Components/Table/Table';

const Splash = ({}) => {

    const dispatch = useDispatch();
    const { workspaces, selectedWorkspace, creatingWorkspace } = useSelector((state) => state.application);

    useLayoutEffect(() => {
        dispatch(loadWorkspaces());
    }, [dispatch]);

    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Flightlink</h1>
                    <h4 className={styles.version}>Alpha 0.1.0</h4>
                </div>
                <div className={styles.tableContainer}>
                    <TableHeader title={"Workspaces"}/>
                    {
                        (workspaces.length > 0) ? 
                        <Table rows={workspaces} row={(workspace, index) => {
                            const selected = workspace.id === selectedWorkspace;
                            return (
                                <TableRow 
                                    className={[styles.workspaceRow, selected && styles.selectedRow].join(' ')} 
                                    onClick={() => dispatch(setSelectedWorkspace(workspace.id))} 
                                    selected={selected}
                                >
                                    <div className={styles.workspaceName}><p>{workspace.name}</p></div>
                                    <div className={styles.workspacePath}><p>{
                                        workspace.path.split('/').slice(0, -1).join('/')
                                    }</p></div>
                                </TableRow>
                            )}
                        }/>
                        :
                        <div className={styles.emptyTable}>
                            No current workspaces
                        </div>
                    }
                </div>
            </div>
            <div className={styles.actionContainer}>
                <div className={styles.leftActions}>
                    <TextButton 
                        onClick={() => dispatch(createWorkspace())} 
                        loading={creatingWorkspace}
                        disabled={creatingWorkspace}
                        loadingMessage={"Creating Workspace..."}
                    >
                        Create New Workspace
                    </TextButton>
                </div>
                <div className={styles.rightActions}>
                    <SecondaryButton className={styles.button}>Close</SecondaryButton>
                    <PrimaryButton
                        onClick={() => dispatch(openSelectedWorkspace(selectedWorkspace))}
                        className={styles.button}
                        disabled={!selectedWorkspace}
                    >Open</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Splash;