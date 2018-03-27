import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {makeSelectLocation} from 'containers/App/selectors';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});
//  ({
//   location: state.router.location,
// });

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default ConnectedSwitch;
