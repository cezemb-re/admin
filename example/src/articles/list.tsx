import { ReactElement } from 'react';
import { Table, Selection } from '@cezembre/ui';
import { useHistory } from 'react-router-dom';
import { useTitle } from '@cezembre/admin';
import Article from './model';
import articles from './data';

export default function List(): ReactElement {
  useTitle('Articles');

  const history = useHistory();

  return (
    <div className="articles-list">
      <Table<Article>
        columns={[
          { key: 'title', label: 'Titre' },
          { key: 'description', label: 'Description' },
        ]}
        data={articles}
        onSelectItem={(item: Selection) =>
          typeof item === 'string' ? history.push(`/articles/${item}`) : undefined
        }
      />
    </div>
  );
}
