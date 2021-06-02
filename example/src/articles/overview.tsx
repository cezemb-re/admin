import React, { ReactElement } from 'react';
import Article from './model';

export interface Props {
  article: Article;
}

export default function Overview({ article }: Props): ReactElement {
  return (
    <div className="articles-overview">
      <h1>Overview</h1>

      <p>{article.title}</p>
      <p>{article.description}</p>
    </div>
  );
}
