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
    <div className="cezembre-admin-navigation-namespaces">
      <section className="header">
        <div className="avatar">
          <Avatar size="small" />
        </div>
        <h1>{project}</h1>
      </section>

      <section className="body">
        {namespaces
          ? namespaces.map((namespace: Namespace) => (
              <div className="namespace" key={namespace.to}>
                <Button
                  styleType="link"
                  fullWidth
                  shape="rounded"
                  leftIcon={namespace.icon}
                  to={namespace.to}>
                  {namespace.label}
                </Button>
              </div>
            ))
          : null}
      </section>

      <section className="footer">
        {/* <Button buttonStyle="text" theme="light" leftIcon="arrow"> */}
        {/*  Collapse */}
        {/* </Button> */}
      </section>
    </div>
  );
}
