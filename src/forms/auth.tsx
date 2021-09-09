import { ReactElement, useCallback, useState } from 'react';
import { Field, Form, FormErrors, FormState, getDefaultFormState } from '@cezembre/forms';
import validator from 'validator';
import { Input, Button } from '@cezembre/ui';

export interface Credentials {
  email?: string;
  password?: string;
}

export interface Props {
  onCredentialSignIn?: (credentials: Credentials) => Promise<void> | void;
}

export default function Auth({ onCredentialSignIn = undefined }: Props): ReactElement {
  const [formState, setFormState] = useState<FormState<Credentials>>(
    getDefaultFormState<Credentials>(),
  );

  const form = useCallback((formContext) => {
    if (formContext) {
      setFormState(formContext.formState);
    }
  }, []);

  const validate = useCallback((credentials: Credentials): FormErrors<Credentials> => {
    const errors: FormErrors<Credentials> = {};

    if (!credentials.email) {
      errors.email = 'Entrez votre email';
    } else if (!validator.isEmail(credentials.email)) {
      errors.email = 'Email non valide';
    }

    if (!credentials.password) {
      errors.password = 'Entrez votre mot de passe';
    }

    return errors;
  }, []);

  return (
    <div className="cezembre-admin-forms-auth">
      <div className="methods">
        <h1>Administration</h1>
        <p>Espace réservé</p>

        <Form<Credentials>
          ref={form}
          onSubmit={onCredentialSignIn}
          validate={validate}
          className="credentials">
          <div className="field">
            <Field
              component={Input}
              name="email"
              label="Email"
              spellCheck={false}
              autoCorrect={false}
            />
          </div>

          <div className="field">
            <Field
              component={Input}
              type="password"
              name="password"
              label="Mot de passe"
              spellCheck={false}
              autoCorrect={false}
            />
          </div>

          <div className="submit">
            <Button type="submit">Me connecter</Button>
          </div>

          {formState.error ? <p className="error">{formState.error}</p> : null}
        </Form>
      </div>

      <div className="illustration" />
    </div>
  );
}
