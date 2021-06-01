import React, { ReactElement, ReactNode } from 'react';
import { Avatar, Button, Icon, IconName } from '@cezembre/ui';

export interface Namespace {
  label: string;
  to: string;
  icon?: IconName | ReactNode;
}

export interface Props {
  namespaces?: Namespace[];
}

export default function Namespaces({ namespaces = [] }: Props): ReactElement {
  return (
    <div className="cezembre-admin-menu-namespaces">
      <section className="header">
        <div className="avatar">
          <Avatar size="small" />
        </div>
        <h1>Fleuraison</h1>
      </section>

      <section className="body">
        {namespaces
          ? namespaces.map((namespace: Namespace) => (
              <div className="link" key={namespace.to}>
                <Button
                  buttonStyle="text"
                  theme="light"
                  leftIcon={namespace.icon || IconName.DASHBOARD}
                  to={namespace.to}
                >
                  {namespace.label}
                </Button>
              </div>
            ))
          : null}
      </section>

      <section className="footer">
        <Button
          buttonStyle="text"
          theme="light"
          leftIcon={<Icon name={IconName.ARROW} rotate={-90} size={15} />}
        >
          Collapse
        </Button>
      </section>
    </div>
  );
}
