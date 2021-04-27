import React, { ReactElement } from 'react';
import Admin from '@cezembre/admin';
import './App.scss';
import { IconName } from '@cezembre/ui';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Admin
        authenticated
        links={[
          { label: 'Accueil', to: '/' },
          { label: 'Users', to: '/users', icon: IconName.USER },
        ]}>
        <h1>Hello there</h1>
      </Admin>
    </div>
  );
}
