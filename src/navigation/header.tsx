import { ReactElement } from 'react';
import { Button } from '@cezembre/ui';
import { useNavigate } from 'react-router-dom';

export interface Section {
  label: string;
  to: string;
}

export interface Props {
  showBackButton?: boolean;
  title?: string;
  sections?: Section[];
}

export default function Header({ showBackButton, title, sections }: Props): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="cezembre-admin-navigation-header">
      <div className="namespace">
        {showBackButton ? (
          <Button styleType="link" leftIcon="arrow-left" onClick={() => navigate(-1)}>
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
