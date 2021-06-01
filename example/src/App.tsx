import React, { ReactElement } from 'react';
import Admin from '@cezembre/admin';
import { IconName } from '@cezembre/ui';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Articles from './articles';
import Dashboard from './dashboard';

const namespaces = [
  { label: 'Dashboard', to: '/' },
  { label: 'Articles', to: '/articles', icon: IconName.MESSAGE },
];

export default function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Admin
          authenticated
          namespaces={namespaces}
          backButton={(event) => {
            console.log('HERE');
          }}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/articles" component={Articles} />
          </Switch>
        </Admin>
      </BrowserRouter>
    </div>
  );
}
