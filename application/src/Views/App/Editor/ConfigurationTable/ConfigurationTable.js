import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfigurationTable.module.scss';
import Resizable from 'Components/Core/Resizable/Resizable';
import { CollapsibleSection } from 'Components/Collapsible/Collapsible';
import Table, { TableRow } from 'Components/Table/Table';
import { PrimaryButton } from 'Components/Button/Button';
import { setSelectedConfigurationId, configurationRowContext } from 'Store/Interface/Editor/ConfigurationEditor';
import { createConfiguration } from 'Store/Data/Workspace/Configurations';

const ConfigurationTable = ({...props}) => {

    const dispatch = useDispatch();
    const { configurationIds, configurationEntities } = useSelector((state) => state.data.workspace.configurations);
    const { selectedConfigurationId } = useSelector((state) => state.interface.editor.configurations);

    return(
        <Resizable right={true} xmin={144} handle={4} xmax={344} className={styles.container}>
            <CollapsibleSection title={"Configurations"} initialState={true}>
                <Table
                    rows={configurationIds}
                    row={(id, index) => {
                        const configuration = configurationEntities[id];
                        const selected = id === selectedConfigurationId
                        return(
                            <TableRow
                                key={id}
                                selected={selected}
                                onClick={() => dispatch(setSelectedConfigurationId(id))}
                                onContextMenu={() => dispatch(configurationRowContext(id))}
                            >
                                {configuration.name}
                            </TableRow>
                        )
                    }}
                />
            </CollapsibleSection>
            <div className={styles.actionWrapper}>
                <PrimaryButton onClick={() => dispatch(createConfiguration())}>
                    New Configuration
                </PrimaryButton>
            </div>
        </Resizable>
    )
}

export default ConfigurationTable;