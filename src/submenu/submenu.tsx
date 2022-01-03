/**
 * This component demonstrates usage of the config object. Its structure
 * comes from `../config-schema.ts`. For more information about the
 * configuration system, please see that file.
 */
import { useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { Config } from '../config-schema';
import styles from './submenu.css';
import { icons, Tile, Button } from 'carbon-components-react';
//  import {launchPatientWorkspace} from '@openmrs/esm-patient-common-lib';
import { patientVitalsBiometricsFormWorkspace } from '../constants';
import Add16 from '@carbon/icons-react/es/add/16';
import { useTranslation } from 'react-i18next';

export function SubMenu() {
  const { t } = useTranslation();
  // const launchBiometricsForm = React.useCallback(
  //     () => launchPatientWorkspace(patientVitalsBiometricsFormWorkspace),
  //     [],
  // );

  return (
    <div className={styles.submenu}>
      <div className="bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col">
            <Tile>
              <h2> Active Visits</h2>
            </Tile>
          </div>

          <div className="bx--col">
            <Tile>
              <Button kind="tertiary">Default</Button>
              <Button kind="tertiary">Large</Button>
            </Tile>
          </div>

          <div className="bx--col">
            <Tile>
              <Button kind="secondary" renderIcon={Add16} iconDescription="Add biometrics">
                {t('add', 'Add Patient To List')}
              </Button>
            </Tile>
          </div>
        </div>
      </div>
    </div>
  );
}
