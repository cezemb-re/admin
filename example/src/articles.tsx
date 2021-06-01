import React, { ReactElement } from 'react';
import { IconName, Table } from '@cezembre/ui';
import { useBackTo, useNamespaces, useSections, useTitle } from '@cezembre/admin';

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

const sections = [
  { label: 'Accueil', to: '/articles' },
  { label: 'Users', to: '/articles/description' },
];

const articleNamespaces = [
  { label: 'Accueil', to: '/' },
  { label: 'Oui', to: '/articles', icon: IconName.USER },
];

export default function Articles(): ReactElement {
  useNamespaces(articleNamespaces);
  useBackTo('/');
  useTitle('Articles');
  useSections(sections);

  return (
    <div>
      <Table<Article>
        columns={[
          { key: 'title', title: 'Titre' },
          { key: 'description', title: 'Description' },
        ]}
        data={articles}
      />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
