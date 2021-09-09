import { ReactElement, useCallback, useState } from 'react';
import { ArticleForm, ParagraphFields } from '@cezembre/admin';
import { RawDraftContentState } from 'draft-js';
import Article from './model';

export interface Props {
  article: Article;
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
  id: string;
  article: string | null;
  type: Type | null;
  size: Size | null;
  style: string | null;
  content: string | RawDraftContentState | null;
  position: number;
}

export default function Overview({ article }: Props): ReactElement {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);

  const deleteParagraph = useCallback((id: string | number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  }, []);

  const onCreateParagraph = useCallback(
    (fields: ParagraphFields): Promise<string> => {
      return new Promise((resolve) => {
        const id = Math.random().toString(36).substr(2, 10);
        setTimeout(() => {
          setParagraphs((p) => {
            const np = [...p];
            np.push({
              id,
              article: article.id,
              type: Type.richText,
              size: Size.auto,
              style: null,
              content: fields.content || null,
              position: 0,
            });
            return np;
          });
          resolve(id);
        }, 10);
      });
    },
    [article.id],
  );

  const onChangeParagraph = useCallback((id: string | number, fields: ParagraphFields) => {
    console.log('Change', id);
  }, []);

  return (
    <div className="articles-overview">
      <ArticleForm
        initialParagraphs={paragraphs.map((paragraph: Paragraph) => ({
          id: paragraph.id || undefined,
          key: paragraph.id,
          content: paragraph.content || undefined,
          size: paragraph.size || 'auto',
          type: paragraph.type || 'text',
        }))}
        onCreateParagraph={onCreateParagraph}
        onChangeParagraph={onChangeParagraph}
        onDeleteParagraph={deleteParagraph}
      />

      {paragraphs.map((p) => (
        <p key={p.id}>{p.id}</p>
      ))}
    </div>
  );
}
