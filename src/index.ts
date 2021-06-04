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
import ArticleForm, { ArticleFields } from './forms/article';
import { ParagraphFields } from './forms/paragraph';

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

export type { Credentials, ArticleFields, ParagraphFields };

export { AuthForm, ArticleForm };

/**
 * Admin
 */
export default Admin;
