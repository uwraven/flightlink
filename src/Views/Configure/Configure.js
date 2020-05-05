import React, { useState } from 'react';
import styles from './Configure.module.scss';
import Table, { TableRow } from 'Components/Table/Table';
import { CollapsibleSection } from 'Components/Collapsible/Collapsible';
import { PrimaryButton } from 'Components/Button/Button';
import Resizable from 'Components/Core/Resizable/Resizable';


const rows = [
    "0",
    "1",
    "2",
]

const Configure = (props) => {

    // TODO: redux
    const [selected, setSelected] = useState(1);

    return(
        <div className={styles.container}>
            <Resizable right={true} xmin={144} handle={4} xmax={344} className={styles.configurationSelector}>
                <CollapsibleSection title={"Configurations"} initialState={true} >
                    <Table
                        rows={rows}
                        row={(id, i) => 
                            <TableRow selected={i === selected} onClick={() => setSelected(i)}>
                                {id}
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
            <div className={styles.configurationPanel}>
                {/* this should be broken into a separate view */}
                <div className={styles.titleBar}>
                    {/* pass id to name field here */}
                </div>
                <Resizable right={true} xmin={144} handle={4} xmax={344} xInitial={312} className={styles.signalSelector}>
                    TEST
                    {/* Pass id to form component here */}
                </Resizable>
            </div>
        </div>
    )
}

export default Configure;
