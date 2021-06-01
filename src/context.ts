import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { Namespace } from './menus/namespaces';
import { Section } from './menus/header';

export interface AdminContext {
  initialNamespaces?: Namespace[];
  namespaces?: Namespace[];
  setNamespaces: Dispatch<SetStateAction<Namespace[] | undefined>>;
  initialBackTo?: string;
  backTo?: string;
  setBackTo: Dispatch<SetStateAction<string | undefined>>;
  initialTitle?: string;
  title?: string;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  initialSections?: Section[];
  sections?: Section[];
  setSections: Dispatch<SetStateAction<Section[] | undefined>>;
}

export function getDefaultContext(): AdminContext {
  return {
    initialNamespaces: undefined,
    namespaces: undefined,
    setNamespaces: () => undefined,
    backTo: undefined,
    initialBackTo: undefined,
    setBackTo: () => undefined,
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

export function useBackTo(backTo: string | undefined): void {
  const { initialBackTo, setBackTo } = useAdminContext();
  useEffect(() => {
    setBackTo(backTo);
    return () => setBackTo(initialBackTo);
  }, [backTo, initialBackTo, setBackTo]);
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
