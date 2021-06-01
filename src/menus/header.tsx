import React, { ReactElement } from 'react';
import { Button, IconName } from '@cezembre/ui';
import { useHistory } from 'react-router-dom';

export interface Section {
  label: string;
  to: string;
}

export interface Props {
  backButton?: boolean;
  title?: string;
  sections?: Section[];
}

export default function Header({
  backButton,
  title,
  sections,
}: Props): ReactElement {
  const history = useHistory();

  return (
    <div className="cezembre-admin-menus-header">
      <div className="general" />

      <div className="namespace">
        {backButton ? (
          <Button
            buttonStyle="link"
            leftIcon={IconName.ARROW}
            leftIconRotation={180}
            onClick={history.goBack}
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
