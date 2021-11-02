import { ReactElement, useCallback, useState } from 'react';
import { ArticleForm, ParagraphFields } from '@cezembre/admin';
import { RawDraftContentState } from 'draft-js';
import Article from './model';

export interface Props {
  article: Article;
  onCreateParagraph?: (paragraph?: Paragraph) => Promise<void> | void;
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
          setParagraphs((ps) => {
            return [
              ...ps,
              {
                id,
                article: article.id,
                type: Type.richText,
                size: Size.auto,
                content: fields.content,
                position: 0,
              },
            ];
          });
          resolve(id);
        }, 1000);
      });
    },
    [article.id],
  );

  const onChangeParagraph = useCallback((id: string | number, fields: ParagraphFields) => {
    console.log('Change paragraph', id);
  }, []);

  return (
    <div className="articles-overview">
      <ArticleForm
        initialParagraphs={paragraphs.map((paragraph: Paragraph, index) => ({
          key: paragraph.id || index.toString(10),
          id: paragraph.id,
          content: paragraph.content,
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
