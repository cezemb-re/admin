import { createContext, MouseEvent, useContext, useEffect } from 'react';
import { Namespace } from './menus/namespaces';
import { Section } from './menus/header';

export interface AdminContext {
  initialNamespaces?: Namespace[];
  namespaces?: Namespace[];
  setNamespaces: (namespaces: Namespace[] | undefined) => void;
  initialBackButton?: (
    event: MouseEvent<HTMLButtonElement>
  ) => Promise<void> | void;
  backButton?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  setBackButton: (
    callback:
      | ((event: MouseEvent<HTMLButtonElement>) => Promise<void> | void)
      | undefined
  ) => void;
  initialTitle?: string;
  title?: string;
  setTitle: (title: string | undefined) => void;
  initialSections?: Section[];
  sections?: Section[];
  setSections: (sections: Section[] | undefined) => void;
}

export function getDefaultContext(): AdminContext {
  return {
    initialNamespaces: undefined,
    namespaces: undefined,
    setNamespaces: () => undefined,
    backButton: undefined,
    initialBackButton: undefined,
    setBackButton: () => undefined,
    initialTitle: undefined,
    title: undefined,
    setTitle: () => undefined,
    initialSections: undefined,
    sections: undefined,
    setSections: () => undefined,
  };
}

const adminContext = createContext<AdminContext>(getDefaultContext());

export function useAdminContext(): AdminContext {
  return useContext<AdminContext>(adminContext);
}

export default adminContext;

export function useNamespaces(namespaces: Namespace[] | undefined): void {
  const { initialNamespaces, setNamespaces } = useAdminContext();
  useEffect(() => {
    setNamespaces(namespaces);
    return () => setNamespaces(initialNamespaces);
  }, [initialNamespaces, namespaces, setNamespaces]);
}

export function useBackButton(
  backButton:
    | ((event: MouseEvent<HTMLButtonElement>) => Promise<void> | void)
    | undefined
): void {
  const { initialBackButton, setBackButton } = useAdminContext();
  useEffect(() => {
    setBackButton(backButton);
    return () => setBackButton(initialBackButton);
  }, [backButton, initialBackButton, setBackButton]);
}

export function useTitle(title: string | undefined): void {
  const { initialTitle, setTitle } = useAdminContext();
  useEffect(() => {
    setTitle(title);
    return () => setTitle(initialTitle);
  }, [title, initialTitle, setTitle]);
}

export function useSections(sections: Section[] | undefined): void {
  const { initialSections, setSections } = useAdminContext();
  useEffect(() => {
    setSections(sections);
    return () => setSections(initialSections);
  }, [sections, initialSections, setSections]);
}
