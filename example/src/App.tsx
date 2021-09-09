import { ReactElement } from 'react';
import Admin, { Namespace } from '@cezembre/admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Dashboard from './dashboard';
import Articles from './articles/list';
import Article from './articles/page';

const namespaces: Namespace[] = [
  { label: 'Dashboard', to: '/' },
  { label: 'Articles', to: '/articles', icon: 'edit' },
];

export default function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Admin authenticated namespaces={namespaces} project="Example">
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
