import React, { ReactElement, useEffect, useState } from 'react';
import { Field, Form } from '@cezembre/forms';
import { Wysiwyg } from '@cezembre/ui';

export interface ParagraphState {
  key: string;
  id?: string | number;
  position?: number;
  type?: 'title' | 'text' | 'rich-text' | 'image' | 'video' | 'custom';
  size?: 'auto' | 'tiny' | 'small' | 'medium' | 'large';
  style?: string | null;
  content?: string | object | null;
}

export interface ParagraphFields {
  type?: 'title' | 'text' | 'rich-text' | 'image' | 'video' | 'custom';
  size?: 'auto' | 'tiny' | 'small' | 'medium' | 'large';
  content?: string | object | null;
}

export interface Props {
  paragraph: ParagraphState;
  onChange?: (paragraph: ParagraphFields) => Promise<void> | void;
}

export default function Paragraph({
  paragraph,
  onChange,
}: Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>([
    'cezembre-admin-forms-paragraph',
  ]);

  useEffect(() => {
    const nextClassNames: string[] = ['cezembre-admin-forms-paragraph'];

    if ('size' in paragraph && paragraph.size) {
      nextClassNames.push(paragraph.size);
    }

    setClassNames(nextClassNames);
  }, [paragraph]);

  return (
    <Form<ParagraphFields> className={classNames.join(' ')} onChange={onChange}>
      <div className="contextual-menu">
        <Field name="type" initialValue={paragraph.type} type="hidden" />
      </div>

      <div className={`content ${paragraph.type}`}>
        {paragraph.type === 'rich-text' ? (
          <Field
            component={Wysiwyg}
            initialValue={paragraph.content}
            name="content"
            type="paragraph"
            placeholder="Votre texte ici ..."
          />
        ) : null}
      </div>
    </Form>
  );
}
