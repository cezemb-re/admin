import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Field, Form, FormState, getDefaultFormState } from '@cezembre/forms';
import { Icon, IconName, Wysiwyg } from '@cezembre/ui';
import { RawDraftContentState } from 'draft-js';

export type Type = 'title' | 'text' | 'rich-text' | 'media';
export type Size = 'auto' | 'tiny' | 'small' | 'medium' | 'large';

export interface ParagraphState {
  key: string;
  id?: string | number;
  position?: number;
  type?: Type;
  size?: Size;
  style?: string | null;
  content?: string | RawDraftContentState;
}

export interface ParagraphFields {
  type?: Type;
  size?: Size;
  content?: string | RawDraftContentState;
}

export interface Props {
  paragraph: ParagraphState;
  onChange?: (paragraph: ParagraphFields) => Promise<void> | void;
  onDelete?: () => void;
}

export default function Paragraph({
  paragraph,
  onChange,
  onDelete,
}: Props): ReactElement {
  const [formState, setFormState] = useState<FormState<ParagraphFields>>(
    getDefaultFormState<ParagraphFields>()
  );
  const [empty, setEmpty] = useState<boolean>(true);

  const form = useCallback((formContext) => {
    if (formContext) {
      setFormState(formContext.formState);
    }
  }, []);

  const [classNames, setClassNames] = useState<string[]>([
    'cezembre-admin-forms-paragraph',
  ]);

  useEffect(() => {
    const nextClassNames: string[] = ['cezembre-admin-forms-paragraph'];

    if ('size' in paragraph && paragraph.size) {
      nextClassNames.push(paragraph.size);
    }

    if (empty) {
      nextClassNames.push('empty');
    }

    if (formState.fields.content?.isActive) {
      nextClassNames.push('active');
    }

    setClassNames(nextClassNames);
  }, [empty, formState.fields.content, paragraph]);

  useEffect(() => {
    if (!formState.values.content) {
      setEmpty(true);
    } else if (typeof formState.values.content === 'string') {
      setEmpty(formState.values.content.length <= 0);
    } else if (formState.values.content.blocks.length === 1) {
      setEmpty(formState.values.content.blocks[0].text.length <= 0);
    } else {
      setEmpty(false);
    }
  }, [formState.values.content]);

  const toggleContextualMenu = useCallback(() => {}, []);

  return (
    <Form<ParagraphFields>
      ref={form}
      className={classNames.join(' ')}
      onChange={onChange}
    >
      <div className="contextual-menu">
        <Field<Type> name="type" initialValue={paragraph.type} type="hidden" />
        <button typeof="button" onClick={toggleContextualMenu}>
          <Icon name={IconName.EDIT} />
        </button>
      </div>

      <div className={`content ${paragraph.type}`}>
        {paragraph.type === 'rich-text' ? (
          <Field
            component={Wysiwyg}
            initialValue={paragraph.content}
            name="content"
            type="paragraph"
            placeholder="Votre texte ici ..."
            onDelete={onDelete}
          />
        ) : null}
      </div>
    </Form>
  );
}
