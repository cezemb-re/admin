import React, { ReactElement } from 'react';
import Admin from '@cezembre/admin';
import './App.scss';
import { Button, IconName, Table } from '@cezembre/ui';

interface Article {
  id: string;
  title: string;
  description: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Oui',
    description: 'Voici un article',
  },
  {
    id: '2',
    title: 'Ceci est un article',
    description: 'Oui comme ça',
  },
  {
    id: '3',
    title: 'Ok',
    description: 'Hell World!',
  },
];

export default function App(): ReactElement {
  return (
    <div className="App">
      <Admin
        authenticated
        links={[
          { label: 'Accueil', to: '/' },
          { label: 'Users', to: '/users', icon: IconName.USER },
        ]}>
        <div>
          <Button>Nouvel article</Button>
        </div>

        <Table<Article>
          columns={[
            { key: 'title', title: 'Titre' },
            { key: 'description', title: 'Description' },
          ]}
          data={articles}
        />
      </Admin>
    </div>
  );
}
