import Admin from './admin';
import adminContext, {
  AdminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackTo,
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
  useBackTo,
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
