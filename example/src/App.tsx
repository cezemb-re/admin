import { ReactElement } from 'react';
import Admin, { Namespace } from '@cezembre/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Article from './articles/page';

const namespaces: Namespace[] = [{ label: 'Articles', to: '/', icon: 'edit' }];

export default function App(): ReactElement {
  return (
    <div className="App">
      <Admin authenticated namespaces={namespaces} project="Example">
        <Routes>
          <Route path="/" element={<Article />} />
        </Routes>
      </Admin>
    </div>
  );
}
