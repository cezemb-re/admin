import React, { ReactElement, ReactNode } from 'react';
import { Avatar, Button, Icon, IconName } from '@cezembre/ui';

export interface SideLink {
  label: string;
  to: string;
  icon?: IconName | ReactNode;
}

export interface Props {
  links?: SideLink[];
}

export default function Side({ links = [] }: Props): ReactElement {
  return (
    <div className="cezembre-admin-side">
      <section className="header">
        <div className="avatar">
          <Avatar size="small" />
        </div>
        <h1>Fleuraison</h1>
      </section>

      <section className="body">
        {links
          ? links.map((link: SideLink) => (
              <div className="link" key={link.label}>
                <Button
                  buttonStyle="text"
                  theme="light"
                  leftIcon={link.icon || IconName.DASHBOARD}
                  to={link.to}
                >
                  {link.label}
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
