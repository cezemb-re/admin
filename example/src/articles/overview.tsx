import React, { ReactElement, useCallback } from 'react';
import { ArticleForm, ArticleFields, ParagraphFields } from '@cezembre/admin';
import Article from './model';

export interface Props {
  article: Article;
}

export function createParagraph(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('TEST_ID'), 500);
  });
}

export default function Overview({ article }: Props): ReactElement {
  const onChangeArticle = useCallback((fields: ArticleFields) => {
    console.log(fields.title);
  }, []);

  const onCreateParagraph = useCallback(async (fields: ParagraphFields) => {
    console.log('CREATE PARAGRAPH');
    const id = await createParagraph();
    return id;
  }, []);

  const onChangeParagraph = useCallback((id: string | number, fields: ParagraphFields) => {
    console.log(id, fields.content);
  }, []);

  return (
    <div className="articles-overview">
      <ArticleForm
        title="Test"
        onChangeArticle={onChangeArticle}
        onCreateParagraph={onCreateParagraph}
        onChangeParagraph={onChangeParagraph}
      />
    </div>
  );
}
