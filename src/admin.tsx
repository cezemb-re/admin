import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Auth, { Props as AuthProps } from './forms/auth';
import Side, { Props as SideProps } from './menus/side';

export interface Props extends AuthProps, SideProps {
  authenticated?: boolean;
  children?: ReactNode;
}

export default function Admin({
  authenticated = false,
  onCredentialSignIn = undefined,
  links = [],
  children,
}: Props): ReactElement | null {
  const [route, setRoute] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (!authenticated) {
      setRoute(<Auth onCredentialSignIn={onCredentialSignIn} />);
    } else {
      setRoute(
        <div className="cezembre-admin">
          <div className="side">
            <Side links={links} />
          </div>

          <div className="body">{children}</div>
        </div>
      );
    }
  }, [authenticated, children, links, onCredentialSignIn]);

  return route;
}
