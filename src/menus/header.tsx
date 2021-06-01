import React, { ReactElement } from 'react';
import { Button, IconName } from '@cezembre/ui';

export interface Section {
  label: string;
  to: string;
}

export interface Props {
  backTo?: string;
  title?: string;
  sections?: Section[];
}

export default function Header({
  backTo,
  title,
  sections,
}: Props): ReactElement {
  return (
    <div className="cezembre-admin-menus-header">
      <div className="general" />

      <div className="namespace">
        {backTo ? (
          <Button
            buttonStyle="link"
            leftIcon={IconName.ARROW}
            leftIconRotation={180}
            to={backTo}
          >
            Retour
          </Button>
        ) : null}

        {title ? <h1>{title}</h1> : null}

        {sections && sections.length ? (
          <div className="sections">
            {sections.map((section: Section) => (
              <div className="section" key={section.to}>
                <Button buttonStyle="link" to={section.to}>
                  {section.label}
                </Button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
