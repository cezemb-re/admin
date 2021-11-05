import { ReactElement, useCallback, useState } from 'react';
import { ArticleForm, ParagraphFields } from '@cezembre/admin';
import { RawDraftContentState } from 'draft-js';
import Article from './model';

export interface Props {
  article: Article;
  onCreateParagraph?: (fields: ParagraphFields) => Promise<string | number> | string | number;
  onChangeParagraph?: (id: string | number, fields: ParagraphFields) => Promise<void> | void;
  onDeleteParagraph?: (id: string | number) => Promise<boolean> | boolean;
}

enum Size {
  auto = 'auto',
  tiny = 'tiny',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

enum Type {
  title = 'title',
  text = 'text',
  richText = 'rich-text',
  media = 'media',
}

interface Paragraph {
  id?: string;
  article?: string;
  type?: Type;
  size?: Size;
  style?: string;
  content?: string | RawDraftContentState;
  position?: number;
}

export default function Overview({
  article,
  onCreateParagraph,
  onChangeParagraph,
  onDeleteParagraph,
}: Props): ReactElement {
  return (
    <div className="articles-overview">
      <ArticleForm
        initialParagraphs={article.paragraphs?.map((paragraph: Paragraph, index) => ({
          key: paragraph.id || index.toString(10),
          id: paragraph.id,
          content: paragraph.content,
          size: paragraph.size || 'auto',
          type: paragraph.type || 'text',
        }))}
        onCreateParagraph={onCreateParagraph}
        onChangeParagraph={onChangeParagraph}
        onDeleteParagraph={onDeleteParagraph}
      />
    </div>
  );
}
