import Admin from './admin';
import adminContext, {
  AdminContext,
  useAdminContext,
  useNamespaces,
  useSections,
  useTitle,
  useBackButton,
} from './context';

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
 * Admin
 */
export default Admin;
