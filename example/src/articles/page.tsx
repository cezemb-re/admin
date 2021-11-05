import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams, useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useBackButton, useTitle, useSections } from '@cezembre/admin';
import Overview from './overview';
import Details from './details';
import Article from './model';
import { ParagraphFields } from '../../../src';
import Paragraph from './paragraphs/model';

export interface Params {
  article: string;
}

export default function Page(): ReactElement | null {
  const history = useHistory();
  const params = useParams<Params>();
  const { path } = useRouteMatch();

  const [article, setArticle] = useState<Article>({
    id: 'yes',
    creation: '',
    last_update: '',
    title: 'Un article',
    description: 'Une description',
  });

  useTitle('Article');
  useSections([
    { label: 'Overview', to: `/articles/${params.article}` },
    { label: 'Details', to: `/articles/${params.article}/details` },
  ]);

  const createParagraph = useCallback(
    (fields: ParagraphFields): Promise<string> => {
      console.log('Create paragraph !');
      return new Promise((resolve, reject) => {
        const paragraph: Paragraph = {
          id: Math.random().toString(36).substr(2, 10),
          article: article.id,
          creation: '',
          last_update: '',
          content: fields.content,
        };

        setTimeout(() => {
          setArticle((a: Article) => {
            const nA = { ...a };

            if (!nA.paragraphs?.length) {
              nA.paragraphs = [paragraph];
            } else {
              nA.paragraphs = [...nA.paragraphs, paragraph];
            }
            return nA;
          });
          resolve(paragraph.id);
        }, 500);
      });
    },
    [article.id],
  );

  return (
    <div className="articles-page">
      <Switch>
        <Route path={`${path}/`} exact>
          <Overview article={article} onCreateParagraph={createParagraph} />
        </Route>
        <Route path={`${path}/details`} exact>
          <Details article={article} />
        </Route>
      </Switch>
    </div>
  );
}
