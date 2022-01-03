/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from 'react';
import styles from './hello.css';
import QueueTable from '../src/queue/queue';
import { MyHeader } from '../src/header/header';
import { SubMenu } from '../src/submenu/submenu';

const Hello: React.FC = () => {
  return (
    <div className={`omrs-main-content ${styles.container}`}>
      <MyHeader />
      <SubMenu />
      <QueueTable />
    </div>
  );
};

export default Hello;
