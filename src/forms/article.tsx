import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Field, Form } from '@cezembre/forms';
import { Input } from '@cezembre/ui';
import Paragraph, { ParagraphFields, ParagraphState } from './paragraph';

export interface ArticleState {
  title?: string | null;
  paragraphs?: ParagraphState[];
}

export interface ArticleFields {
  title: string | null;
}

export interface Props {
  title?: string | null;
  initialParagraphs?: ParagraphState[];
  onChangeArticle?: (fields: ArticleFields) => Promise<void> | void;
  onCreateParagraph?: (
    fields: ParagraphFields
  ) => Promise<string | number> | string | number;
  onChangeParagraph?: (
    id: string | number | undefined,
    fields: ParagraphFields
  ) => Promise<void> | void;
  onDeleteParagraph?: (id: string | number | undefined) => Promise<void> | void;
}

export default function Article({
  title,
  initialParagraphs,
  onChangeArticle,
  onCreateParagraph,
  onChangeParagraph,
}: Props): ReactElement {
  const [paragraphs, setParagraphs] = useState<ParagraphState[]>(
    initialParagraphs || []
  );

  useEffect(() => {
    if (!paragraphs.length) {
      setParagraphs((list) => {
        list.push({
          key: Math.random().toString(36).substr(2, 10),
          type: 'rich-text',
        });
        return list;
      });
    }
  }, [paragraphs.length]);

  const changeParagraph = useCallback(
    async (paragraph: ParagraphState, fields: ParagraphFields) => {
      if (!paragraph.id && onCreateParagraph) {
        let id = onCreateParagraph(fields);
        if (
          id &&
          typeof id === 'object' &&
          'then' in id &&
          id.then &&
          typeof id.then === 'function'
        ) {
          id = await id;
        }

        if (id && (typeof id === 'string' || typeof id === 'number')) {
          const index = paragraphs.findIndex(
            ({ key }) => key === paragraph.key
          );
          if (index !== -1) {
            paragraphs[index].id = id;
            setParagraphs(paragraphs);
          }
        }
      } else if (onChangeParagraph) {
        const res = onChangeParagraph(paragraph.id, fields);
        if (
          res &&
          typeof res === 'object' &&
          'then' in res &&
          res.then &&
          typeof res.then === 'function'
        ) {
          await res;
        }
      }
    },
    [onChangeParagraph, onCreateParagraph, paragraphs]
  );

  return (
    <div className="cezembre-admin-forms-article">
      <Form<ArticleFields> onChange={onChangeArticle} className="article">
        <div className="field title">
          <Field
            component={Input}
            name="title"
            inputStyle="inline"
            placeholder="Titre ..."
            initialValue={title}
          />
        </div>
      </Form>

      {paragraphs.length ? (
        <div className="paragraphs">
          {paragraphs.map((paragraph: ParagraphState) => (
            <div key={paragraph.key} className="paragraph">
              <Paragraph
                paragraph={paragraph}
                onChange={(fields: ParagraphFields) =>
                  changeParagraph(paragraph, fields)
                }
              />
            </div>
          ))}
        </div>
      ) : null}

      {/* <div className="new-paragraph"> ... </div> */}
    </div>
  );
}
