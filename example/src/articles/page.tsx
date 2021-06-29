import { ReactElement } from 'react';
import { useParams, useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useBackButton, useTitle, useSections } from '@cezembre/admin';
import articles from './data';
import Overview from './overview';
import Details from './details';

export interface Params {
  article: string;
}

export default function Page(): ReactElement | null {
  const history = useHistory();
  const params = useParams<Params>();
  const { path } = useRouteMatch();

  const article = articles.find(({ id }) => id === params.article);

  useBackButton(history.goBack);
  // useTitle('Article');
  useSections([
    { label: 'Overview', to: `/articles/${params.article}` },
    { label: 'Details', to: `/articles/${params.article}/details` },
  ]);

  if (!article) {
    return null;
  }

  return (
    <div className="articles-page">
      <Switch>
        <Route path={`${path}/`} exact>
          <Overview article={article} />
        </Route>
        <Route path={`${path}/details`} exact>
          <Details article={article} />
        </Route>
      </Switch>
    </div>
  );
}
