/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
// import {ErrorBoundary} from '@strapi/helper-plugin';
import { Grid, GridItem } from '@strapi/design-system/Grid';

// Utils
import pluginId from '../../pluginId';
// Containers
import Nav from '../../components/Nav';
import ExportPage from '../ExportPage';
import ImportPage from '../ImportPage';
import UtilPage from '../UtilPage';
import Welcome from '../Welcome';

const App = () => {
  return (
    <div>
      <Grid>
        <GridItem col={3} padding={1}>
          <Nav/>
        </GridItem>
        <GridItem col={9} padding={1}>
          <Switch>
            <Route path={`/plugins/${pluginId}/export`} component={ExportPage}
                   exact/>
            <Redirect to={`/plugins/${pluginId}/export`}/>
          </Switch>
        </GridItem>
      </Grid>
    </div>
  );
};

export default App;
