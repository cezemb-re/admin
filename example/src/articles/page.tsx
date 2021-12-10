import { ReactElement, useCallback, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { useBackButton, useTitle, useSections, ParagraphFields } from '@cezembre/admin';
import Overview from './overview';
import Details from './details';
import Article from './model';
import Paragraph from './paragraphs/model';

export interface Params {
  article: string;
}

export default function Page(): ReactElement | null {
  const params = useParams<'article'>();

  useBackButton(true);

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
      <Routes>
        <Route
          path="/"
          element={<Overview article={article} onCreateParagraph={createParagraph} />}
        />
        <Route path="/details" element={<Details article={article} />} />
      </Routes>
    </div>
  );
}
