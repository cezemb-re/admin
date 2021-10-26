import { MouseEvent, ReactElement } from 'react';
import { Button } from '@cezembre/ui';
import { useHistory } from 'react-router-dom';

export interface Section {
  label: string;
  to: string;
}

export interface Props {
  backButton?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  title?: string;
  sections?: Section[];
}

export default function Header({ backButton, title, sections }: Props): ReactElement {
  const history = useHistory();

  return (
    <div className="cezembre-admin-navigation-header">
      <div className="namespace">
        {backButton && history.length ? (
          <Button styleType="link" leftIcon="arrow-left" onClick={backButton}>
            Retour
          </Button>
        ) : null}

        {title ? <h1>{title}</h1> : null}

        {sections && sections.length ? (
          <div className="sections">
            {sections.map((section: Section) => (
              <div className="section" key={section.to}>
                <Button styleType="link" to={section.to}>
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
