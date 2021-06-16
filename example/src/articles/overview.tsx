import React, { ReactElement, useCallback } from 'react';
import { ArticleForm, ParagraphFields } from '@cezembre/admin';
import Article from './model';

export interface Props {
  article: Article;
}

export function createParagraph(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random().toString(10).substr(2, 10)), 500);
  });
}

export function deleteParagraph(id: string | number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
}

export default function Overview({ article }: Props): ReactElement {
  const onCreateParagraph = useCallback(async (fields: ParagraphFields) => {
    const id = await createParagraph();
    return id;
  }, []);

  const onChangeParagraph = useCallback((id: string | number, fields: ParagraphFields) => {}, []);

  const onDeleteParagraph = useCallback(async (id: string | number): Promise<boolean> => {
    const res = await deleteParagraph(id);
    return res;
  }, []);

  return (
    <div className="articles-overview">
      <ArticleForm
        title="Test"
        onCreateParagraph={onCreateParagraph}
        onChangeParagraph={onChangeParagraph}
        onDeleteParagraph={onDeleteParagraph}
      />
    </div>
  );
}
