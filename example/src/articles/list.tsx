import { ReactElement } from 'react';
import { Table } from '@cezembre/ui';
import { useTitle } from '@cezembre/admin';
import { useHistory } from 'react-router-dom';
import Article from './model';
import articles from './data';

export default function List(): ReactElement {
  const history = useHistory();

  useTitle('Articles');

  return (
    <div className="articles-list">
      <Table<Article>
        columns={[
          { key: 'title', title: 'Titre' },
          { key: 'description', title: 'Description' },
        ]}
        data={articles}
        onClickItem={(article: Article) => history.push(`/articles/${article.id}`)}
      />
    </div>
  );
}
