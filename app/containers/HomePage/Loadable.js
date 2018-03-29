/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

import {PageLoader} from 'components/ui';

export default Loadable({
  loader: () => import('./index'),
  loading: PageLoader,
});
