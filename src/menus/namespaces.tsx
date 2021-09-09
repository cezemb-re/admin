import { ReactElement } from 'react';
import { Avatar, Button, IconName } from '@cezembre/ui';

export interface Namespace {
  label: string;
  to: string;
  icon?: IconName;
}

export interface Props {
  project?: string;
  namespaces?: Namespace[];
}

export default function Namespaces({ project, namespaces = [] }: Props): ReactElement {
  return (
    <div className="cezembre-admin-menu-namespaces">
      <section className="header">
        <div className="avatar">
          <Avatar size="small" />
        </div>
        <h1>{project}</h1>
      </section>

      <section className="body">
        {namespaces
          ? namespaces.map((namespace: Namespace) => (
              <div className="link" key={namespace.to}>
                <Button
                  buttonStyle="text"
                  theme="light"
                  leftIcon={namespace.icon || 'dashboard'}
                  to={namespace.to}>
                  {namespace.label}
                </Button>
              </div>
            ))
          : null}
      </section>

      <section className="footer">
        <Button buttonStyle="text" theme="light" leftIcon="arrow">
          Collapse
        </Button>
      </section>
    </div>
  );
}
