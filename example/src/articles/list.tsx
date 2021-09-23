import { ReactElement, useState } from 'react';
import { Table, Selection } from '@cezembre/ui';
import { useTitle, useProperties } from '@cezembre/admin';
import Article from './model';
import articles from './data';

export default function List(): ReactElement {
  const [selection, setSelection] = useState<Selection>();

  useTitle('Articles');

  useProperties(selection);

  return (
    <div className="articles-list">
      <Table<Article>
        columns={[
          { key: 'title', label: 'Titre' },
          { key: 'description', label: 'Description' },
        ]}
        data={articles}
        onSelectItem={setSelection}
      />
    </div>
  );
}
