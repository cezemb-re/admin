import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Field, Form } from '@cezembre/forms';
import { Icon, IconName, Input } from '@cezembre/ui';
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
  onChangeParagraph?: (
    id: string | number | undefined,
    fields: ParagraphFields
  ) => Promise<void> | void;
}

export default function Article({
  title,
  initialParagraphs,
  onChangeArticle,
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
                  onChangeParagraph
                    ? onChangeParagraph(paragraph.id, fields)
                    : undefined
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
