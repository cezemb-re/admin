import React, { ReactElement } from 'react';
import Admin from '@cezembre/admin';
import { IconName } from '@cezembre/ui';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Dashboard from './dashboard';
import Articles from './articles/list';
import Article from './articles/page';

const namespaces = [
  { label: 'Dashboard', to: '/' },
  { label: 'Articles', to: '/articles', icon: IconName.EDIT },
];

export default function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Admin authenticated namespaces={namespaces}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/:article" component={Article} />
          </Switch>
        </Admin>
      </BrowserRouter>
    </div>
  );
}
