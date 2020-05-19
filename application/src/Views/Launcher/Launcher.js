import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Launcher.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { 
    getWorkspaceReferences, 
    openWorkspace,
    quitApplication
} from 'Store/Data/Application/Application';
import { 
    setSelectedWorkspaceId,
    createWorkspace
} from 'Store/Interface/Launcher/LauncherSlice';
import { PrimaryButton, SecondaryButton, TextButton } from 'Components/Button/Button';
import Table, {TableRow, TableHeader} from 'Components/Table/Table';

const Launcher = ({}) => {

    const dispatch = useDispatch();
    const { selectedWorkspaceId, creatingWorkspace } = useSelector((state) => state.launcher);
    const { workspaceReferenceIds, workspaceReferenceEntities } = useSelector((state) => state.application);

    useLayoutEffect(() => {
        dispatch(getWorkspaceReferences());
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
                        (workspaceReferenceIds.length > 0) ? 
                        <Table rows={workspaceReferenceIds} row={(id, index) => {
                            const selected = id === selectedWorkspaceId;
                            const workspace = workspaceReferenceEntities[id];
                            return (
                                <TableRow 
                                    className={[styles.workspaceRow, selected && styles.selectedRow].join(' ')} 
                                    onClick={() => dispatch(setSelectedWorkspaceId(workspace.id))} 
                                    selected={selected}
                                    key={id}
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
                    <SecondaryButton 
                        className={styles.button}
                        onClick={() => dispatch(quitApplication())}
                        >
                            Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={() => dispatch(openWorkspace(selectedWorkspaceId))}
                        className={styles.button}
                        disabled={!selectedWorkspaceId}
                    >Open</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Launcher;