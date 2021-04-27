import React, { ReactElement, ReactNode } from 'react';
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
}: Props): ReactElement {
  if (!authenticated) {
    return <Auth onCredentialSignIn={onCredentialSignIn} />;
  }
  return (
    <div className="cezembre-admin">
      <div className="side">
        <Side links={links} />
      </div>

      <div className="body">{children}</div>
    </div>
  );
}
