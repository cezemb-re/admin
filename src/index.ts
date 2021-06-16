import Admin from './admin';
import adminContext, {
  AdminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackButton,
} from './context';

import AuthForm, { Credentials } from './forms/auth';
import ArticleForm from './forms/article';
import {
  ParagraphFields,
  Type as ParagraphType,
  Size as ParagraphSize,
} from './forms/paragraph';

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
};

export type { AdminContext };

/**
 * Forms
 */

export type { Credentials, ParagraphFields, ParagraphSize, ParagraphType };

export { AuthForm, ArticleForm };

/**
 * Admin
 */
export default Admin;
