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

  console.log('here', headerData);

  return (
    <div>
      <div className="bx--row landing-page__r3">
        {headerData.map((d, i) => (
          <div className="info-card  bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-1">
            <Tile>
              <div className="info-card__heading">
                <h4>{d.title} </h4>
                <span className="pull-right">
                  {' '}
                  Patient List
                  <ArrowRight16 />
                </span>
              </div>
              <p className="info-card__body"> {d.subtitle} </p>
              <h3> {d.total}</h3>{' '}
            </Tile>
          </div>
        ))}
      </div>
    </div>
  );
}
