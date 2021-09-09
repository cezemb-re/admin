import {
  createContext,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import _ from 'lodash';
import { Namespace } from './menus/namespaces';
import { Section } from './menus/header';

export interface AdminContext {
  initialNamespaces?: Namespace[];
  namespaces?: Namespace[];
  setNamespaces?: Dispatch<SetStateAction<Namespace[] | undefined>>;
  initialBackButton?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  backButton?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  setBackButton?: Dispatch<
    SetStateAction<((event: MouseEvent<HTMLButtonElement>) => Promise<void> | void) | undefined>
  >;
  initialTitle?: string;
  title?: string;
  setTitle?: Dispatch<SetStateAction<string | undefined>>;
  initialSections?: Section[];
  sections?: Section[];
  setSections?: Dispatch<SetStateAction<Section[] | undefined>>;
}

const adminContext = createContext<AdminContext>({});

export function useAdminContext(): AdminContext {
  return useContext<AdminContext>(adminContext);
}

export default adminContext;

export function useNamespaces(namespaces: Namespace[] | undefined): void {
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

export function useBackButton(
  backButton: ((event: MouseEvent<HTMLButtonElement>) => Promise<void> | void) | undefined,
): void {
  const { initialBackButton, setBackButton } = useAdminContext();
  const memoizedBackButton = useRef<
    ((event: MouseEvent<HTMLButtonElement>) => Promise<void> | void) | undefined
  >();

  useEffect(() => {
    if (!_.isEqual(memoizedBackButton.current, backButton) && setBackButton) {
      setBackButton(() => backButton);
      memoizedBackButton.current = backButton;
    }
  }, [backButton, initialBackButton, setBackButton]);

  useEffect(() => {
    return () => (setBackButton ? setBackButton(() => initialBackButton) : undefined);
  }, [initialBackButton, setBackButton]);
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
