import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Auth, { Props as AuthProps } from './forms/auth';
import Namespaces, {
  Props as NamespacesProps,
  Namespace,
} from './menus/namespaces';
import Header, { Props as HeaderProps, Section } from './menus/header';
import adminContext from './context';
import Contextual from './menus/contextual';

export interface Props extends AuthProps, NamespacesProps, HeaderProps {
  authenticated?: boolean;
  children?: ReactNode;
}

export default function Admin({
  namespaces,
  authenticated = false,
  onCredentialSignIn = undefined,
  backTo,
  title,
  sections,
  children,
}: Props): ReactElement | null {
  const [route, setRoute] = useState<ReactElement | null>(null);

  const [currentNamespaces, setCurrentNamespaces] = useState<
    Namespace[] | undefined
  >(namespaces);

  const [currentBackTo, setCurrentBackTo] = useState<string | undefined>(
    backTo
  );
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const [currentSections, setCurrentSections] = useState<Section[] | undefined>(
    sections
  );

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
            initialBackTo: backTo,
            backTo: currentBackTo,
            setBackTo: setCurrentBackTo,
            initialTitle: title,
            title: currentTitle,
            setTitle: setCurrentTitle,
            initialSections: sections,
            sections: currentSections,
            setSections: setCurrentSections,
          }}
        >
          <div className="cezembre-admin">
            <div className="namespaces-menu">
              <Namespaces namespaces={currentNamespaces} />
            </div>

            <div className="container">
              <div className="header">
                <Header
                  backTo={currentBackTo}
                  title={currentTitle}
                  sections={currentSections}
                />
              </div>

              <div className="body">{children}</div>
            </div>

            <div className="contextual-menu">
              <Contextual />
            </div>
          </div>
        </adminContext.Provider>
      );
    }
  }, [
    authenticated,
    backTo,
    children,
    currentBackTo,
    currentNamespaces,
    currentSections,
    currentTitle,
    namespaces,
    onCredentialSignIn,
    sections,
    title,
  ]);

  return route;
}
