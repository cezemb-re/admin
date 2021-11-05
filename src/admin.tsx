import { ReactElement, ReactNode, useEffect, useState } from 'react';
import Auth, { Props as AuthProps } from './forms/auth';
import Namespaces, { Props as NamespacesProps, Namespace } from './navigation/namespaces';
import Header, { Props as HeaderProps, Section } from './navigation/header';
import adminContext from './context';

export interface Props extends AuthProps, NamespacesProps, HeaderProps {
  authenticated?: boolean;
  children?: ReactNode;
}

export default function Admin({
  project,
  namespaces,
  authenticated = false,
  onCredentialSignIn = undefined,
  showBackButton,
  title,
  sections,
  children,
}: Props): ReactElement | null {
  const [route, setRoute] = useState<ReactElement | null>(null);

  const [currentNamespaces, setCurrentNamespaces] = useState<Namespace[] | undefined>(namespaces);

  const [currentShowBackButton, setCurrentShowBackButton] = useState<boolean | undefined>(
    () => showBackButton,
  );
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const [currentSections, setCurrentSections] = useState<Section[] | undefined>(sections);

  const [properties, setProperties] = useState<ReactNode | undefined>();

  useEffect(() => {
    if (!authenticated) {
      setRoute(<Auth onCredentialSignIn={onCredentialSignIn} />);
    } else {
      setRoute(
        <adminContext.Provider
          value={{
            initialNamespaces: namespaces,
            namespaces: currentNamespaces,
            setNamespaces: setCurrentNamespaces,
            initialShowBackButton: showBackButton,
            showBackButton: currentShowBackButton,
            setShowBackButton: setCurrentShowBackButton,
            initialTitle: title,
            title: currentTitle,
            setTitle: setCurrentTitle,
            initialSections: sections,
            sections: currentSections,
            setSections: setCurrentSections,
            properties,
            setProperties,
          }}>
          <div className="cezembre-admin">
            <div className="namespaces-menu">
              <Namespaces project={project} namespaces={currentNamespaces} />
            </div>

            <div className="container">
              <div className="header">
                <Header
                  showBackButton={currentShowBackButton}
                  title={currentTitle}
                  sections={currentSections}
                />
              </div>

              <div className="body">{children}</div>
            </div>

            <div className={`properties${properties ? ' active' : ''}`}>{properties}</div>
          </div>
        </adminContext.Provider>,
      );
    }
  }, [
    properties,
    authenticated,
    showBackButton,
    children,
    currentShowBackButton,
    currentNamespaces,
    currentSections,
    currentTitle,
    namespaces,
    onCredentialSignIn,
    project,
    sections,
    title,
  ]);

  return route;
}
