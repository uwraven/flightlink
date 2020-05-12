import React, { useState } from 'react';
import styles from './Configure.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import { CollapsibleSection } from 'Components/Collapsible/Collapsible';
import { PrimaryButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';
import SignalConfiguration from './SignalConfiguration/SignalConfiguration';
import { setSelectedConfigurationId } from 'Store/Configure/ConfigureSlice';
import { useDispatch, useSelector } from 'react-redux';


const rows = [
    "0",
    "1",
    "2",
]

const Configure = (props) => {

    // TODO: redux
    const dispatch = useDispatch();
    const { selectedConfigurationId } = useSelector((state) => state.configure);

    return(
        <div className={styles.container}>
            <Resizable right={true} xmin={144} handle={4} xmax={344} className={styles.configurationSelector}>
                <CollapsibleSection title={"Configurations"} initialState={true} >
                    <Table
                        rows={rows}
                        row={(key, i) => 
                            <TableRow selected={key === selectedConfigurationId} onClick={() => dispatch(setSelectedConfigurationId(key))}>
                                {key}
                            </TableRow>
                        }
                    />
                </CollapsibleSection>
                <div className={styles.actionWrapper}>
                    <PrimaryButton>
                        New Configuration
                    </PrimaryButton>
                </div>
            </Resizable>
            
            { selectedConfigurationId ? <SignalConfiguration configurationId={"0"}/> : <div className={styles.emptyConfigContainer}>
                No Configuration Selected
            </div> }
        </div>
    )
}

export default Configure;
