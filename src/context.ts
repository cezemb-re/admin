import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import _ from 'lodash';
import { Namespace } from './navigation/namespaces';
import { Section } from './navigation/header';

export interface AdminContext {
  initialNamespaces?: Namespace[];
  namespaces?: Namespace[];
  setNamespaces?: Dispatch<SetStateAction<Namespace[] | undefined>>;
  initialShowBackButton?: boolean;
  showBackButton?: boolean;
  setShowBackButton?: Dispatch<SetStateAction<boolean | undefined>>;
  initialTitle?: string;
  title?: string;
  setTitle?: Dispatch<SetStateAction<string | undefined>>;
  initialSections?: Section[];
  sections?: Section[];
  setSections?: Dispatch<SetStateAction<Section[] | undefined>>;
  properties?: ReactNode;
  setProperties?: Dispatch<SetStateAction<ReactNode | undefined>>;
}

const adminContext = createContext<AdminContext>({});

export function useAdminContext(): AdminContext {
  return useContext<AdminContext>(adminContext);
}

export default adminContext;

export function useNamespaces(namespaces?: Namespace[]): void {
  const { initialNamespaces, setNamespaces } = useAdminContext();
  const memoizedNamespaces = useRef<Section[] | undefined>();

  useEffect(() => {
    if (!_.isEqual(memoizedNamespaces.current, namespaces) && setNamespaces) {
      setNamespaces(namespaces);
      memoizedNamespaces.current = namespaces;
    }
  }, [initialNamespaces, namespaces, setNamespaces]);

  useEffect(() => {
    return () => (setNamespaces ? setNamespaces(initialNamespaces) : undefined);
  }, [initialNamespaces, setNamespaces]);
}

export function useBackButton(showBackButton?: boolean): void {
  const { initialShowBackButton, setShowBackButton } = useAdminContext();
  const memoizedShowBackButton = useRef<boolean | undefined>();

  useEffect(() => {
    if (!_.isEqual(memoizedShowBackButton.current, showBackButton) && setShowBackButton) {
      setShowBackButton(() => showBackButton);
      memoizedShowBackButton.current = showBackButton;
    }
  }, [showBackButton, initialShowBackButton, setShowBackButton]);

  useEffect(() => {
    return () =>
      setShowBackButton !== undefined ? setShowBackButton(initialShowBackButton) : undefined;
  }, [initialShowBackButton, setShowBackButton]);
}

export function useTitle(title: string | undefined): void {
  const { initialTitle, setTitle } = useAdminContext();
  const memoizedTitle = useRef<string | undefined>();

  useEffect(() => {
    if (memoizedTitle.current !== title && setTitle) {
      setTitle(title);
      memoizedTitle.current = title;
    }
  }, [title, initialTitle, setTitle]);

  useEffect(() => {
    return () => (setTitle ? setTitle(initialTitle) : undefined);
  }, [initialTitle, setTitle]);
}

export function useSections(sections: Section[] | undefined): void {
  const { initialSections, setSections } = useAdminContext();
  const memoizedSections = useRef<Section[] | undefined>();

  useEffect(() => {
    if (!_.isEqual(memoizedSections.current, sections) && setSections) {
      setSections(sections);
      memoizedSections.current = sections;
    }
  }, [sections, initialSections, setSections]);

  useEffect(() => {
    return () => (setSections ? setSections(initialSections) : undefined);
  }, [initialSections, setSections]);
}

export function useProperties(properties: ReactNode | undefined): void {
  const { setProperties } = useAdminContext();

  useEffect(() => {
    if (setProperties) {
      setProperties(properties);
    }
  }, [properties, setProperties]);

  useEffect(() => {
    return () => (setProperties ? setProperties(undefined) : undefined);
  }, [setProperties]);
}
