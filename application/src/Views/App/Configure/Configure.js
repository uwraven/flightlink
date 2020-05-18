import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Configure.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import { CollapsibleSection } from 'Components/Collapsible/Collapsible';
import { PrimaryButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalConfiguration from './SignalConfiguration/SignalConfiguration';
import { setSelectedConfigurationId } from 'Store/Workspace/Editor/ConfigurationEditorSlice';

const Configure = (props) => {

    // TODO: redux
    const dispatch = useDispatch();
    const { configurationEntities, configurationIds } = useSelector((state) => state.workspace.configurations);
    const { selectedConfigurationId } = useSelector((state) => state.workspace);

    console.log(useSelector(state => state))

    return(
        <div className={styles.container}>
            <Resizable right={true} xmin={144} handle={4} xmax={344} className={styles.configurationSelector}>
                <CollapsibleSection title={"Configurations"} initialState={true}>
                    <Table
                        rows={configurationIds}
                        row={(id, i) => {
                            const configuration = configurationEntities[id]
                            const selected = id === selectedConfigurationId;
                            return(
                                <TableRow
                                    key={id} 
                                    selected={selected} 
                                    onClick={() => dispatch(setSelectedConfigurationId(id))}>
                                    {configuration.name}
                                </TableRow>
                            )
                        }}
                    />
                </CollapsibleSection>
                <div className={styles.actionWrapper}>
                    <PrimaryButton>
                        New Configuration
                    </PrimaryButton>
                </div>
            </Resizable>
            { selectedConfigurationId ?
                <SignalConfiguration configurationId={selectedConfigurationId}/> 
                : 
                <div className={styles.emptyConfigContainer}>
                    No Configuration Selected
                </div>
            }
        </div>
    )
}

export default Configure;
