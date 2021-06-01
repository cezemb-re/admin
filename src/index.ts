import Admin from './admin';
import adminContext, {
  AdminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackButton,
} from './context';
import { Credentials } from './forms/auth';

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

export type { Credentials };

/**
 * Admin
 */
export default Admin;
