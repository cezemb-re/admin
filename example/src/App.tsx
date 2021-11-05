import { ReactElement } from 'react';
import Admin, { Namespace } from '@cezembre/admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Article from './articles/page';

const namespaces: Namespace[] = [{ label: 'Articles', to: '/', icon: 'edit' }];

export default function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Admin authenticated namespaces={namespaces} project="Example">
          <Switch>
            <Route path="/" component={Article} />
          </Switch>
        </Admin>
      </BrowserRouter>
    </div>
  );
}
