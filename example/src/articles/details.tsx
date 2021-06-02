import React, { ReactElement } from 'react';
import Article from './model';

export interface Props {
  article: Article;
}

export default function Details({ article }: Props): ReactElement {
  return (
    <div className="articles-overview">
      <h1>Details</h1>

      <p>ID: {article.id}</p>
      <p>TITLE: {article.title}</p>
      <p>DESCRIPTION: {article.description}</p>
    </div>
  );
}
