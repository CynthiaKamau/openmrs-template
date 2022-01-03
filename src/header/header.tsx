/**
 * This component demonstrates usage of the config object. Its structure
 * comes from `../config-schema.ts`. For more information about the
 * configuration system, please see that file.
 */
import { useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { Config } from '../config-schema';
import styles from './header.css';
import { icons, Tile } from 'carbon-components-react';
import JsonData from './headerdata.json';
import { ArrowRight16 } from '@carbon/icons-react';

export function MyHeader() {
  const { data: headerData } = JsonData;

  return (
    <div className="bx--grid--full-width">
      <div className="bx--row">
        <h3 className={styles.metrics}>Clinic metrics</h3>
      </div>
      <div className="bx--row">
        {headerData.map((d, i) => (
          <div className="bx--col">
            <Tile light className={styles.t}>
              <div className="bx--col">
                <h4>{d.title} </h4>
              </div>

              <div className="bx--col">
                <span className={styles.info_card_right}>
                  Patient List
                  <ArrowRight16 />
                </span>
              </div>

              <div className={styles.footer}>
                <p> {d.subtitle} </p>
                <h3 className={styles.footer_text}> {d.total}</h3>{' '}
              </div>
            </Tile>
          </div>
        ))}
      </div>
    </div>
  );
}
