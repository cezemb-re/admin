import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Field,
  Form,
  FormContext,
  FormFields,
  FormState,
  getDefaultFormState,
} from '@cezembre/forms';
import { Icon, Wysiwyg } from '@cezembre/ui';
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

export interface ParagraphFields extends FormFields {
  type?: Type;
  size?: Size;
  content?: string | RawDraftContentState;
}

export interface Props {
  paragraph: ParagraphState;
  onChange?: (
    paragraph: ParagraphFields,
    changes?: Partial<ParagraphFields>,
  ) => Promise<void> | void;
  onDelete?: () => void;
}

export default function Paragraph({ paragraph, onChange, onDelete }: Props): ReactElement {
  const [formState, setFormState] = useState<FormState<ParagraphFields>>(
    getDefaultFormState<ParagraphFields>(),
  );
  const [empty, setEmpty] = useState<boolean>(true);

  const form = useCallback((formContext: FormContext<ParagraphFields>) => {
    if (formContext?.formState) {
      setFormState(formContext.formState);
    }
  }, []);

  const [classNames, setClassNames] = useState<string[]>(['cezembre-admin-forms-paragraph']);

  useEffect(() => {
    const nextClassNames: string[] = ['cezembre-admin-forms-paragraph'];

    if ('size' in paragraph && paragraph.size) {
      nextClassNames.push(paragraph.size);
    }

    if (empty) {
      nextClassNames.push('empty');
    }

    if (formState.fields?.content?.isActive) {
      nextClassNames.push('active');
    }

    setClassNames(nextClassNames);
  }, [empty, formState.fields, paragraph]);

  useEffect(() => {
    if (!formState.values?.content) {
      setEmpty(true);
    } else if (typeof formState.values.content === 'string') {
      setEmpty(formState.values.content.length <= 0);
    } else if (formState.values.content.blocks.length === 1) {
      setEmpty(formState.values.content.blocks[0].text.length <= 0);
    } else {
      setEmpty(false);
    }
  }, [formState.values]);

  const toggleContextualMenu = useCallback(() => {}, []);

  const changeParagraph = useCallback(
    (fields: ParagraphFields, changes?: Partial<ParagraphFields>) => {
      (async () => {
        if (onChange) {
          const change = onChange(fields, changes);
          if (typeof change === 'object' && change.then && typeof change.then === 'function') {
            await change;
          }
        }
      })();
    },
    [onChange],
  );

  return (
    <Form<ParagraphFields> ref={form} className={classNames.join(' ')} onChange={changeParagraph}>
      <div className="contextual-menu">
        <Field<Type> name="type" initialValue={paragraph.type} type="hidden" />
        <button typeof="button" onClick={toggleContextualMenu}>
          <Icon name="edit" />
        </button>
      </div>

      <div className={`content${paragraph.type ? ` ${paragraph.type}` : ''}`}>
        <Field
          component={Wysiwyg}
          initialValue={paragraph.content}
          name="content"
          type="paragraph"
          placeholder="Votre texte ici ..."
          onDelete={onDelete}
        />
      </div>
    </Form>
  );
}
