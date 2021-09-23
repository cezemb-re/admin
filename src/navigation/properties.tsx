import { ReactNode, useEffect } from 'react';
import { useAdminContext } from '../context';

export interface Props {
  children?: ReactNode;
}

export default function Properties({ children }: Props): null {
  const { setProperties } = useAdminContext();

  useEffect(() => {
    if (setProperties) {
      setProperties(children);
    }
    return () => {
      if (setProperties) {
        setProperties(undefined);
      }
    };
  }, [children, setProperties]);
  return null;
}
