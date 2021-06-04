import React, { ReactElement, useCallback } from 'react';
import { ArticleForm, ArticleFields, ParagraphFields } from '@cezembre/admin';
import Article from './model';

export interface Props {
  article: Article;
}

export default function Overview({ article }: Props): ReactElement {
  const onChangeArticle = useCallback((fields: ArticleFields) => {
    console.log(fields.title);
  }, []);

  const onChangeParagraph = useCallback(
    (id: string | number | undefined, fields: ParagraphFields) => {
      console.log(fields.content);
    },
    [],
  );

  return (
    <div className="articles-overview">
      <ArticleForm
        title="Test"
        onChangeArticle={onChangeArticle}
        onChangeParagraph={onChangeParagraph}
      />
    </div>
  );
}
