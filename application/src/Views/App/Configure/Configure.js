import React, { useState } from 'react';
import styles from './Configure.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import { CollapsibleSection } from 'Components/Collapsible/Collapsible';
import { PrimaryButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalConfiguration from './SignalConfiguration/SignalConfiguration';
import { setSelectedConfigurationId } from 'Store/ConfigureSlice';
import { useDispatch, useSelector } from 'react-redux';

const Configure = (props) => {

    // TODO: redux
    const dispatch = useDispatch();
    const { selectedConfigurationId } = useSelector((state) => state.configure);
    const { configurations } = useSelector((state) => state.workspace);

    return(
        <div className={styles.container}>
            <Resizable right={true} xmin={144} handle={4} xmax={344} className={styles.configurationSelector}>
                <CollapsibleSection title={"Configurations"} initialState={true}>
                    <Table
                        rows={configurations.all}
                        row={(id, i) => {
                            const configuration = configurations.entities[id]
                            const selected = id === selectedConfigurationId;
                            return(
                                <TableRow 
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
