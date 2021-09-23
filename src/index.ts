import './index.scss';
import Admin from './admin';
import adminContext, {
  AdminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackButton,
  useProperties,
} from './context';

import AuthForm, { Credentials } from './forms/auth';
import ArticleForm from './forms/article';
import { ParagraphFields, Type as ParagraphType, Size as ParagraphSize } from './forms/paragraph';
import Properties from './navigation/properties';
import { Namespace } from './navigation/namespaces';

/**
 * Context
 */

export {
  adminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackButton,
  useProperties,
};

export type { AdminContext };

/**
 * Forms
 */

export type { Credentials, ParagraphFields, ParagraphSize, ParagraphType };

export { AuthForm, ArticleForm };

/**
 * Navigation
 */

export { Properties };

export type { Namespace };

/**
 * Admin
 */
export default Admin;
